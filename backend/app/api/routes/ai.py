from fastapi import APIRouter, Depends
from pydantic import BaseModel
import httpx

from app.api.deps import get_current_user
from app.models.user import User

router = APIRouter(prefix="/ai", tags=["ai"])


class ChatIn(BaseModel):
    prompt: str


class ChatOut(BaseModel):
    reply: str


AI_URL = "http://localhost:8100/v1/chat"


@router.post("/chat", response_model=ChatOut)
async def chat(
    body: ChatIn,
    current_user: User = Depends(get_current_user),
) -> ChatOut:
    async with httpx.AsyncClient() as client:
        res = await client.post(AI_URL, json={"prompt": body.prompt})
        res.raise_for_status()
        data = res.json()
        return ChatOut(**data)
