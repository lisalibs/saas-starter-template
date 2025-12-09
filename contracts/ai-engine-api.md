# AI Engine API Contract

## Base URLs

Dev: http://localhost:8100  
Prod: https://ai.yourdomain.com  

The AI engine is a separate service.  
Only the backend should call these endpoints.

---

## POST /v1/chat

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

---

## POST /v1/generate-summary

Request:
{
  "user_id": "uuid",
  "context": "string",
  "input": "string"
}

Response:
{
  "summary": "string",
  "tokens_used": 123,
  "model": "gpt-4.1-mini"
}

---

## Design Rules

- Always return valid JSON.
- Do not talk to the database directly.
- Stay focused on LLM / AI logic.
- Let the backend own persistence and business rules.
