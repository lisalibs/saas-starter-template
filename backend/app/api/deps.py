from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlmodel import Session, select

from app.core.security import decode_token
from app.db.session import get_session
from app.models.user import User, TokenPayload

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


def get_db(session: Session = Depends(get_session)) -> Session:
    return session


def get_current_user(
    token: str = Depends(oauth2_scheme),
    session: Session = Depends(get_db),
) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload: TokenPayload = decode_token(token)
    except Exception:
        raise credentials_exception

    if payload.sub is None:
        raise credentials_exception

    statement = select(User).where(User.email == payload.sub)
    user = session.exec(statement).first()
    if not user:
        raise credentials_exception

    return user
