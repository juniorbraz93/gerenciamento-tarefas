from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from app.core.database import Base, engine
from app.models import user, task
from app.api import auth, tasks
# from dotenv import load_dotenv
# import os

# # Carregar as variáveis de ambiente do arquivo .env
# load_dotenv()

# # Agora você pode acessar as variáveis do .env com os métodos `os.getenv`
# DATABASE_URL = os.getenv("DATABASE_URL")
# SECRET_KEY = os.getenv("SECRET_KEY")
# ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30))

app = FastAPI()

# Configuração do CORS para permitir requisições do frontend
origins = [
    "http://localhost:3000",  # Endereço do React no ambiente de desenvolvimento
    "https://meu-frontend.com",  # Coloque o URL do seu frontend em produção
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Lista de origens permitidas
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos os métodos HTTP (GET, POST, etc)
    allow_headers=["*"],  # Permite todos os headers
)

# Criação automática das tabelas
Base.metadata.create_all(bind=engine)

# Rotas da API
app.include_router(auth.router)
app.include_router(tasks.router)

@app.get("/")
def root():
    return {"message": "server is online"}
