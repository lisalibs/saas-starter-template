from typing import Generator
from sqlmodel import SQLModel, Session, create_engine
import os

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./app.db")

connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(DATABASE_URL, echo=False, connect_args=connect_args)


def get_session() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session


def init_db() -> None:
    # Import models so SQLModel can see them
    from app.models.user import User  # noqa: F401
    from app.models.project import Project  # noqa: F401

    SQLModel.metadata.create_all(bind=engine)
