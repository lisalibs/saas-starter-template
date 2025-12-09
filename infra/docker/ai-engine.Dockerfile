FROM python:3.12-slim

WORKDIR /app

ENV PYTHONUNBUFFERED=1

COPY ai-engine/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY ai-engine/app ./app

EXPOSE 8100

CMD ["python", "-m", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8100"]
