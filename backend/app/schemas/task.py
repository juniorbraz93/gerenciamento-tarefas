from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from enum import Enum

class PriorityEnum(str, Enum):
    baixa = "baixa"
    media = "média"
    alta = "alta"

class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    deadline: Optional[datetime] = None
    priority: PriorityEnum = PriorityEnum.media
    tags: Optional[str] = None

class TaskCreate(TaskBase):
    pass

class TaskUpdate(TaskBase):
    pass

class TaskOut(TaskBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True
