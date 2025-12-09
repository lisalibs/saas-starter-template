# Backend ? AI Engine + External Services Contract

## AI Engine

Dev base URL: http://localhost:8100  
Prod base URL: https://ai.yourdomain.com  

The backend is the only component allowed to call the AI engine.

---

## Endpoint: POST /v1/generate-summary

Called by: Backend service

Request body:
{
  "user_id": "uuid",
  "context": "string",
  "input": "string"
}

Response body:
{
  "summary": "string",
  "tokens_used": 123,
  "model": "gpt-4.1-mini"
}

Error handling:
- 502: AI provider failed
- 504: AI timeout
- Always return a safe, generic message instead of raw provider errors.

---

## Endpoint: POST /v1/chat

Request:
{
  "conversation_id": "uuid",
  "messages": [
    {
      "role": "user",
      "content": "Hello"
    }
  ]
}

Response:
{
  "reply": "assistant text",
  "metadata": {
    "model": "gpt-4.1-mini",
    "latency_ms": 450,
    "tokens": 321
  }
}

Notes:
- Backend is responsible for persisting conversation history.
- AI engine should stay stateless when possible.
