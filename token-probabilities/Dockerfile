FROM python:3.9-bookworm

WORKDIR /app

COPY app.py /app

RUN ["pip", "install", "flask"]
RUN ["pip", "install", "numpy"]
RUN ["pip", "install", "torch"]
RUN ["pip", "install", "-U", "flask-cors"]
RUN ["pip", "install", "transformers"]

EXPOSE 8002

ENTRYPOINT ["python", "app.py"]
