from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# from starlette.middleware.cors import CORSMiddleware
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
# Configuração de CORS
origins = [
    "http://localhost:3000",  # Permite o frontend rodando no localhost:3000
    # Se você tiver outros domínios, pode adicionar aqui
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Permite as origens especificadas
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos os métodos (GET, POST, etc)
    allow_headers=["*"],  # Permite todos os cabeçalhos
)

# Criação automática das tabelas
Base.metadata.create_all(bind=engine)

# Rotas da API
app.include_router(auth.router)
app.include_router(tasks.router)

@app.get("/")
def root():
    return {"message": "server is online"}
