# Shared Data Models

These are the core shapes used across frontend, backend, and AI engine.

---

## User

Represents an authenticated account.

Example shape:
{
  "id": "uuid",
  "email": "string",
  "created_at": "ISO-8601 timestamp"
}

---

## Subscription

Represents a user's plan.

Example shape:
{
  "id": "uuid",
  "user_id": "uuid",
  "plan": "free | pro | enterprise",
  "status": "active | past_due | canceled",
  "renews_at": "ISO-8601 timestamp or null"
}

---

## Example Domain Model

(Replace this with real domain objects for each SaaS.)

For example, a Project:

{
  "id": "uuid",
  "user_id": "uuid",
  "name": "string",
  "created_at": "ISO-8601 timestamp"
}

Add more domain models here as each new SaaS idea becomes real.
