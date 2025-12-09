# Frontend ? Backend API Contract

## Base URLs
Dev: http://localhost:8000/api  
Prod: https://api.yourdomain.com  

## Authentication
Bearer token (JWT)  
Header: Authorization: Bearer <token>

---

## POST /auth/register

Request:
{
  "email": "user@example.com",
  "password": "string"
}

Response 201:
{
  "id": "uuid",
  "email": "user@example.com",
  "token": "jwt-token"
}

Errors:
- 400 invalid input  
- 409 email exists  

---

## POST /auth/login

Request:
{
  "email": "user@example.com",
  "password": "string"
}

Response:
{
  "token": "jwt-token"
}

(Add more endpoints here as your SaaS grows.)
