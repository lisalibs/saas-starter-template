from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import auth, projects, ai
from app.db.session import init_db

app = FastAPI(title="SaaS Starter Backend")

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup() -> None:
    init_db()


@app.get("/health")
def health():
    return {"status": "ok", "service": "backend"}


@app.get("/api/ping")
def ping():
    return {"message": "pong from backend"}


app.include_router(auth.router)
app.include_router(projects.router)
app.include_router(ai.router)
