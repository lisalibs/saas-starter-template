from fastapi import FastAPI

app = FastAPI(title="SaaS Starter Backend")


@app.get("/health")
def health():
    return {"status": "ok", "service": "backend"}


@app.get("/api/ping")
def ping():
    return {"message": "pong from backend"}
