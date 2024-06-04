# WSI-BACKEND

<!-- TOC -->

- [WSI-BACKEND](#wsi-backend)
    - [Current status](#current-status)
    - [How to use](#how-to-use)

<!-- /TOC -->

## Current status

This is the initial status of the repo, just to demonstrate what can be done and how to do it.
Lots of work needed. Right now, model returns random number between 1 and 4 both included.

## How to use

If you're here for front-end development or just to test it:

```
docker build . -t backend
docker run -p 8000:8000/tcp -t backend:latest
```

or without docker (not recommended):

```
pip install -r requirements.txt
uvicorn main:app
```

If you're here for back-end development:

```
pip install -r requirements.txt
uvicorn main:app --reload
```

After that, you can check the `localhost:8000/docs/` to see how can you interact with end-points.
