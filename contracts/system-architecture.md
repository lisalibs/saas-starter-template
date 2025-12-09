# System Architecture Overview

## Frontend
React + TypeScript  
Location: /frontend  

Purpose:
- User interface
- Interacts with Backend via REST API

## Backend
FastAPI (Python)  
Location: /backend  

Handles:
- Authentication
- Business logic
- Database operations
- Communication with AI Engine

## AI Engine
FastAPI (Python)  
Location: /ai-engine  

Handles:
- LLM interactions
- Prompts, tools, embeddings
- Returns structured responses to Backend

## Database
Postgres (containerized via Docker Compose)

## Communication Flow
1. User ? Frontend
2. Frontend ? Backend API
3. Backend ? Database / AI Engine
4. Backend ? Frontend
5. Frontend ? User

## Services Overview
- frontend ? UI
- backend ? core logic + DB
- ai-engine ? AI brain
- db ? persistent storage
