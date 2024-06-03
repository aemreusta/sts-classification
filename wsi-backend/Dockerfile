FROM python:3

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
RUN rm requirements.txt

COPY wsi-backend/* backend/
WORKDIR backend

EXPOSE 8000

ENTRYPOINT ["uvicorn"]
CMD [ "main:app", "--host", "0.0.0.0", "--port", "8000" ]
