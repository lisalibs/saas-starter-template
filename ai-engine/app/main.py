from fastapi import FastAPI

app = FastAPI(title="SaaS Starter AI Engine")


@app.get("/health")
def health():
    return {"status": "ok", "service": "ai-engine"}


@app.post("/v1/chat")
def chat():
    # Placeholder implementation
    return {
        "reply": "This is a stub AI response from the starter template.",
        "metadata": {
            "model": "stub",
            "latency_ms": 0,
            "tokens": 0,
        },
    }
