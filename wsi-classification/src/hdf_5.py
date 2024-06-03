import glob
import os

import h5py
import numpy as np
from PIL import Image

# Define paths and parameters
data_folder = r"D:\emre\wsi_code\datasets\processed\1000_samples"
hdf5_file = "dataset.h5"
image_size = (384, 384)  # Adjust size as needed


def read_path(path, rr=True):
    path_list = []
    for f in glob.iglob(path, recursive=rr):
        path_list.append(str(f))
    path_list.sort()

    return path_list


# Define paths to images
# image_paths = read_path(os.path.join(data_folder, "**", "*.png"))
illness_names = read_path(os.path.join(data_folder, "**"), rr=False)
# print(illness_names)


# Define label mapping for medical illnesses
label_mapping = {"illness_1": 0, "illness_2": 1, "illness_3": 2, "illness_4": 3}

# HDF5 compression settings
compression = "gzip"  # Compression algorithm
compression_opts = 9  # Compression level (0 to 9)

# Auto-chunking settings
auto_chunk = True  # Enable auto-chunking for optimal performance


# Create HDF5 file
with h5py.File(hdf5_file, "w") as f:
    for idx, illness_name in enumerate(illness_names):  # Assuming 4 illnesses
        illness = illness_name.split("\\")[-1]
        illness_group = f.create_group(illness)

        label = label_mapping[f"illness_{idx+1}"]

        patients_names = read_path(os.path.join(illness_name, "*"), rr=False)
        print(patients_names)

        for patient_num in range(1, 6):  # 5 patients per illness
            patient_subgroup = illness_group.create_group(f"patient_{patient_num}")
            patient_path = os.path.join(
                data_folder, f"illness{idx}", f"patient{patient_num}"
            )

            for image_name in os.listdir(patient_path):
                image_path = os.path.join(patient_path, image_name)
                image = Image.open(image_path).resize(image_size)
                image_array = np.array(image)

                # Create datasets under patient subgroup and assign label
                image_dataset = patient_subgroup.create_dataset(
                    image_name,
                    data=image_array,
                    compression=compression,
                    compression_opts=compression_opts,
                    chunks=auto_chunk,
                )
                image_dataset.attrs["label"] = label

print(
    "HDF5 dataset with labels, gzip compression, and auto-chunking created successfully."
)
