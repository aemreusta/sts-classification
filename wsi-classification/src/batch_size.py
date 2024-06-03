import tensorflow as tf
from keras.layers import Flatten, Dense, Dropout
import subprocess

# Check GPU connection
total_gpu_memory = int(
    subprocess.run(
        ["nvidia-smi", "--query-gpu=memory.total", "--format=csv,noheader,nounits"],
        stdout=subprocess.PIPE,
        text=True,
    ).stdout.strip()
)  # in MB
print("Total GPU Memory:", total_gpu_memory, "MB")

# Define data directories
data_dir = r"D:\emre\wsi_code\datasets\processed\1000_samples"


# Load normalized image dataset
def load_normalized_image_dataset(data_dir, validation_split, seed, batch_size):
    normalization_layer = tf.keras.layers.Rescaling(1.0 / 255)
    ds = tf.keras.utils.image_dataset_from_directory(
        data_dir,
        validation_split=validation_split,
        subset="training",
        seed=seed,
        image_size=(384, 384),
        batch_size=batch_size,
        label_mode="categorical",
    )
    normalized_ds = ds.map(lambda x, y: (normalization_layer(x), y))
    return normalized_ds


# Define InceptionV3 model setup
def build_inceptionv3_model():
    InceptionV3_model = tf.keras.applications.InceptionV3(
        input_shape=(384, 384, 3), weights="imagenet", include_top=False
    )

    for layer in InceptionV3_model.layers:
        layer.trainable = False

    InceptionV3_last_output = InceptionV3_model.output
    InceptionV3_x = Flatten()(InceptionV3_last_output)
    InceptionV3_x = Dense(64, activation="tanh")(InceptionV3_x)
    InceptionV3_x = Dropout(0.5)(InceptionV3_x)
    InceptionV3_x = Dense(4, activation="softmax")(InceptionV3_x)
    InceptionV3_x_final_model = tf.keras.Model(
        inputs=InceptionV3_model.input, outputs=InceptionV3_x
    )

    InceptionV3_x_final_model.compile(
        optimizer=tf.keras.optimizers.Adam(learning_rate=5e-5),
        loss="categorical_crossentropy",
        metrics=[
            tf.keras.metrics.CategoricalAccuracy(),
            tf.keras.metrics.Precision(),
            tf.keras.metrics.Recall(),
        ],
    )

    return InceptionV3_x_final_model


# Start with a small batch size and increase it until GPU memory usage is close to or below available memory
max_batch_size = 128
best_batch_size = None
best_gpu_memory_used = 0

# Build the InceptionV3-based model
model = build_inceptionv3_model()

for batch_size in range(8, max_batch_size + 1, 2):
    print(f"Trying batch size: {batch_size}")

    normalized_train_ds = load_normalized_image_dataset(
        data_dir, validation_split=0.3, seed=123, batch_size=batch_size
    )

    # Train the model for a single epoch
    history = model.fit(
        normalized_train_ds, epochs=1, verbose=2, workers=8, use_multiprocessing=True
    )

    # Check GPU memory usage
    try:
        gpu_info = subprocess.run(
            ["nvidia-smi", "--query-gpu=memory.used", "--format=csv,noheader,nounits"],
            stdout=subprocess.PIPE,
            text=True,
        ).stdout.strip()  # in MB
        gpu_memory_used = int(gpu_info)
    except subprocess.CalledProcessError:
        print(f"Failed to get GPU memory usage for batch size {batch_size}")
        continue

    print(f"GPU Memory Used: {gpu_memory_used} MB")

    # If memory usage is close to or below available memory
    if gpu_memory_used >= 0.9 * total_gpu_memory:
        best_batch_size = batch_size
        best_gpu_memory_used = gpu_memory_used
        break

print(f"Optimal Batch Size: {best_batch_size}")
print(f"GPU Memory Used with Optimal Batch Size: {best_gpu_memory_used} MB")
