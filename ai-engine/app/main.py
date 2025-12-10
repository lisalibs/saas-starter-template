from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="AI Engine")


class ChatRequest(BaseModel):
    prompt: str


class ChatResponse(BaseModel):
    reply: str


@app.get("/health")
def health():
    return {"status": "ok", "service": "ai-engine"}


@app.post("/v1/chat", response_model=ChatResponse)
def chat(body: ChatRequest):
    # For now, just echo. Later we can call OpenAI or a local model.
    return ChatResponse(reply=f"AI echo: {body.prompt}")
