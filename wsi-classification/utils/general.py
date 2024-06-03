import os
import glob


def read_path(path, recursive=True):
    path_list = []
    for f in glob.iglob(path, recursive=recursive):
        path_list.append(str(f))
    path_list.sort()

    return path_list


def create_directory(path):
    if not os.path.exists(path):
        os.makedirs(path)
        print(f"Created directory: {path}")
    else:
        print(f"Directory already exists: {path}")


def create_log_directory(run_directory: str, folder_name: str):
    model_dir = os.path.join(run_directory, folder_name, "model")
    checkpoint_dir = os.path.join(run_directory, folder_name, "checkpoints")
    create_directory(model_dir)
    create_directory(checkpoint_dir)

    return checkpoint_dir, model_dir


def find_directory_size(directory_path):
    directory_size = 0
    for dirpath, dirnames, filenames in os.walk(directory_path):
        for filename in filenames:
            directory_size += os.path.getsize(os.path.join(dirpath, filename))
    return f"{directory_size//1024**2} Mb"
