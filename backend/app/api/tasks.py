from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.schemas.task import TaskOut, TaskCreate, TaskUpdate
from app.crud import task as crud_task
from app.dependencies import get_db, get_current_user
from app.models.user import User

router = APIRouter(prefix="/tasks", tags=["Tarefas"])

@router.get("/", response_model=List[TaskOut])
def list_tasks(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    return crud_task.get_tasks(db, user.id)

@router.post("/", response_model=TaskOut)
def create_new_task(task: TaskCreate, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    return crud_task.create_task(db, task, user.id)

@router.get("/{task_id}", response_model=TaskOut)
def get_task(task_id: int, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    db_task = crud_task.get_task(db, task_id, user.id)
    if not db_task:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")
    return db_task

@router.put("/{task_id}", response_model=TaskOut)
def update_task(task_id: int, task_update: TaskUpdate, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    db_task = crud_task.get_task(db, task_id, user.id)
    if not db_task:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")
    return crud_task.update_task(db, db_task, task_update)

@router.delete("/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    db_task = crud_task.get_task(db, task_id, user.id)
    if not db_task:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")
    crud_task.delete_task(db, db_task)
    return {"ok": True}
