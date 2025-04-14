## Indice

- [Sobre](#-sobre)
- [Tecnologias utilizadas](#-tecnologias-utilizadas)
- [Como baixar o projeto](#-como-baixar-o-projeto)
- [Funcionalidades](#-Funcionalidades)

---

## 🤔 Sobre

O **Gerenciamento de Tarefas** é um sistema desenvolvido para ajudar usuários a gerenciar suas atividades diárias.
Ele oferece uma interface fácil de usar, onde é possível criar, editar, excluir e acompanhar o progresso das tarefas,
tudo de forma simples e eficiente.

---

## 💻 Tecnologias utilizadas

Este projeto foi desenvolvido com as seguintes tecnologias:

- 🐍 Python – Para a implementação do backend.

- 🛜 FastAPI – Framework rápido e moderno para a criação de APIs.

- 💻 Uvicorn – Servidor ASGI para execução do FastAPI.

- 🧿 SQLAlchemy – ORM para manipulação de banco de dados.

- 🔵 React.js – Biblioteca para construção da interface do frontend.

- 🛜 Axios – Cliente HTTP para integração frontend-backend.



---

## 📦 Como baixar o projeto

```bash
  # 1. Clonar o repositório

  $ git clone https://github.com/juniorbraz93/gerenciamento-tarefas.git

  # 2. Configurar o Backend

    # - Navegue até a pasta do backend:

  $ cd gerenciamento-tarefas/backend

  # Instale as dependências:

  $ pip install -r requirements.txt

  # Execute o backend:

  $ uvicorn app.main:app --reload

  #3. Configurar o Frontend

    # - Navegue até a pasta do frontend:

  $ cd gerenciamento-tarefas/frontend 

  # Instale as dependências:

  $ yarn

  # Execute o frontend:

  $ yarn start

```

---

## 💻 Funcionalidades

Este sistema de gerenciamento de tarefas oferece as seguintes funcionalidades principais:

1. 🏠 Cadastro de Tarefas ✅

- Crie novas tarefas com informações como nome, descrição, data de vencimento e prioridade.

- A tarefa pode ser marcada como concluída ou pendente.

- As tarefas são salvas no banco de dados e ficam disponíveis para visualização em qualquer dispositivo.

2. 🏠 Edição de Tarefas ✅

- É possível editar qualquer tarefa já cadastrada.

- O usuário pode alterar o nome, descrição, data de vencimento, prioridade e status (concluída ou pendente).

3. 🏠 Exclusão de Tarefas ✅

- Tarefas podem ser removidas do sistema de forma simples e rápida.

- Ao excluir uma tarefa, ela é removida do banco de dados permanentemente.

4. 🏠 Visualização de Tarefas ✅

- As tarefas são exibidas em uma lista no frontend.

- O usuário pode filtrar as tarefas por status (pendentes ou concluídas), prioridade ou data de vencimento.

- Também é possível ordenar as tarefas por data de vencimento ou prioridade.

5. 🏠 Detalhamento de Tarefas ✅

- Cada tarefa possui uma página de detalhes onde o usuário pode ver todas as informações da tarefa, como nome, descrição, data de vencimento, prioridade, status e histórico de alterações.

6. 🏠 Interação em Tempo Real ✅

- As alterações realizadas no sistema, como criação, edição ou exclusão de tarefas, são refletidas imediatamente na interface do usuário.

- O sistema usa uma arquitetura baseada em APIs RESTful para garantir que a interação entre frontend e backend seja rápida e eficiente.

Desenvolvido 🧑‍💻 por [Junior Braz](https://github.com/juniorbraz93)
