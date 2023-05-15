from pydantic import BaseModel

class TodoApp(BaseModel):
    title: str
    iscompleted = bool

class ItemCreate(TodoApp):
    pass

class Item(TodoApp):
    id: int
    owner_id: int

    class Config:
        orm_mode = True

class UserBase(BaseModel):
    email: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_active: bool
    items: list[Item] = []

    class Config:
        orm_mode = True