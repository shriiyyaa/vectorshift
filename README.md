# VectorShift – Frontend Technical Assessment

A pipeline builder built with **React + ReactFlow** (frontend) and **FastAPI** (backend).

---

## Running Locally

### Backend (FastAPI)

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

API runs at: `http://127.0.0.1:8000`

### Frontend (React)

```powershell
cd frontend
npm install
npm start
```

Frontend runs at: `http://localhost:3000`

---

## Features

- **Part 1 – Nodes**: Input, Output, LLM, Text, Prompt, Code, API, Database, Slack nodes
- **Part 2 – Styling**: Cohesive green-brand design system, responsive layout
- **Part 3 – Text Node**: Dynamic resize + auto-variable handles from `{{variable}}` syntax
- **Part 4 – Backend**: `/pipelines/parse` endpoint with DFS DAG detection; alert on submit
