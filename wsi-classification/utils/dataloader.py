import os
import h5py
import numpy as np
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def read_hdf5(path):
    """
    Read an HDF5 file.

    Args:
        path (str): Path to the HDF5 file.

    Returns:
        h5py.File: The opened HDF5 file.
    """
    if not os.path.exists(path):
        logger.error(f"HDF5 file '{path}' not found!")
        raise FileNotFoundError(f"HDF5 file '{path}' not found!")

    return h5py.File(path, "r")


def select_case_data(file_path, selected_cases: list):
    """
    Select data from an HDF5 file based on specified cases.

    Args:
        file_path (str): Path to the HDF5 file.
        selected_cases (list): List of cases to select.

    Returns:
        Tuple[np.ndarray, np.ndarray, np.ndarray, np.ndarray]:
        A tuple containing:
        - np.ndarray: Selected images.
        - np.ndarray: Selected labels.
        - np.ndarray: Remaining images.
        - np.ndarray: Remaining labels.
    """
    with h5py.File(file_path, "r") as file:
        val_cases = []

        selected_images = []
        selected_labels = []
        remaining_images = []
        remaining_labels = []

        for i in range(4):
            for j in range(5):
                key = f"{i:02d}/{j:02d}"

                if j in selected_cases:
                    val_cases.append(key)
                    selected_images.extend(file[key + "/images"][:])
                    selected_labels.extend(file[key + "/labels"][:])
                else:
                    remaining_images.extend(file[key + "/images"][:])
                    remaining_labels.extend(file[key + "/labels"][:])

        logger.info(f"Validation cases: {val_cases}")
        logger.info(
            f"Selected images: {len(selected_images)} (shape: {selected_images[0].shape})"
        )
        logger.info(
            f"Selected labels: {len(selected_labels)} (shape: {selected_labels[0].shape})"
        )
        logger.info(
            f"Remaining images: {len(remaining_images)} (shape: {remaining_images[0].shape})"
        )
        logger.info(
            f"Remaining labels: {len(remaining_labels)} (shape: {remaining_labels[0].shape})"
        )

    logger.info("Data selection completed.")

    return (
        np.array(selected_images, dtype=np.int8),
        np.array(selected_labels, dtype=np.int8),
        np.array(remaining_images, dtype=np.int8),
        np.array(remaining_labels, dtype=np.int8),
    )
