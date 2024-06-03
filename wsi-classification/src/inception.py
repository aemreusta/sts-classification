import tensorflow as tf
import os
from keras.metrics import CategoricalAccuracy, Precision, Recall
from keras.layers import Flatten, Dense, Dropout
from keras.optimizers import Adam
from keras import Model
from keras.callbacks import (
    ModelCheckpoint,
    LearningRateScheduler,
    ReduceLROnPlateau,
)
import matplotlib.pyplot as plt
import wandb

# Initialize wandb
wandb.init(project="wsi-1000-samples", entity="aemreusta")


def create_directory(path):
    if not os.path.exists(path):
        os.makedirs(path)
        print(f"Created directory: {path}")
    else:
        print(f"Directory already exists: {path}")


# Define data directories
work_directory = r"D:\emre\wsi_code"
data_dir = os.path.join(work_directory, "datasets", "processed", "1000_samples")
run_dir = os.path.join(work_directory, "runs", "1000_samples")

start_time = "inception"
checkpoint_dir = os.path.join(run_dir, start_time, "checkpoints")
model_dir = os.path.join(run_dir, start_time, "model")

create_directory(checkpoint_dir)
create_directory(model_dir)


# Load image datasets
def load_image_dataset(data_dir, validation_split, seed, batch_size):
    return tf.keras.utils.image_dataset_from_directory(
        data_dir,
        validation_split=validation_split,
        subset="training",
        seed=seed,
        image_size=(384, 384),
        batch_size=batch_size,
        label_mode="categorical",
    )


train_ds = load_image_dataset(data_dir, validation_split=0.3, seed=123, batch_size=8)
val_ds = load_image_dataset(data_dir, validation_split=0.3, seed=123, batch_size=8)

# Define class names
class_names = train_ds.class_names

# Display sample images

# plt.show()

# Normalize datasets
normalization_layer = tf.keras.layers.Rescaling(1.0 / 255)
normalized_train_ds = train_ds.map(lambda x, y: (normalization_layer(x), y))
normalized_val_ds = val_ds.map(lambda x, y: (normalization_layer(x), y))

# Create InceptionV3 base model
InceptionV3_model = tf.keras.applications.InceptionV3(
    input_shape=(384, 384, 3), weights="imagenet", include_top=False
)

# Freeze layers in the base model
for layer in InceptionV3_model.layers:
    layer.trainable = False

# Build custom classification head
InceptionV3_last_output = InceptionV3_model.output
InceptionV3_x = Flatten()(InceptionV3_last_output)
InceptionV3_x = Dense(64, activation="tanh")(InceptionV3_x)
InceptionV3_x = Dropout(0.5)(InceptionV3_x)
InceptionV3_x = Dense(4, activation="softmax")(InceptionV3_x)
InceptionV3_x_final_model = Model(inputs=InceptionV3_model.input, outputs=InceptionV3_x)

InceptionV3_x_final_model.compile(
    optimizer=Adam(learning_rate=5e-5),
    loss="categorical_crossentropy",
    metrics=[CategoricalAccuracy(), Precision(), Recall()],
)

# Display model summary
InceptionV3_x_final_model.summary()

# Define early stopping
early_stopping = tf.keras.callbacks.EarlyStopping(
    monitor="val_recall", patience=3, restore_best_weights=True
)

# Define ModelCheckpoint callback
checkpoint_name = "inception-{epoch:02d}-{val_recall:.2f}.h5"

model_checkpoint = ModelCheckpoint(
    checkpoint_dir + "/inception.h5", save_best_only=True
)


# Define a learning rate scheduler
def lr_schedule(epoch, lr):
    if epoch < 5:
        return lr
    else:
        return lr * tf.math.exp(
            -0.1
        )  # Reduce learning rate by a factor of ~0.9 every epoch


lr_scheduler = LearningRateScheduler(lr_schedule)

# Define ReduceLROnPlateau callback
reduce_lr_on_plateau = ReduceLROnPlateau(
    monitor="val_loss", factor=0.5, patience=2, min_lr=1e-7
)

# Initialize wandb callback
wandb_callback = wandb.keras.WandbCallback()

# Train the model with callbacks
history = InceptionV3_x_final_model.fit(
    normalized_train_ds,
    validation_data=normalized_val_ds,
    epochs=50,
    verbose=2,
    workers=8,
    use_multiprocessing=True,
    callbacks=[early_stopping, model_checkpoint, lr_scheduler, wandb_callback],
)

# # Train the model with callbacks
history = InceptionV3_x_final_model.fit(
    normalized_train_ds,
    validation_data=normalized_val_ds,
    epochs=50,
    callbacks=[early_stopping, model_checkpoint, reduce_lr_on_plateau, wandb_callback],
)


# Save the trained model
InceptionV3_x_final_model.save(model_dir + "/InceptionV3_model.h5")


# Plot training history
def plot_hist(hist):
    plt.plot(hist.history["recall"])
    plt.plot(hist.history["val_recall"])
    plt.title("model recall")
    plt.ylabel("recall")
    plt.xlabel("epoch")
    plt.legend(["train", "validation"], loc="upper left")
    plt.savefig(run_dir + "/InceptionV3_recall.png")
    # plt.show()


plot_hist(history)
