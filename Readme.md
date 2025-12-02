# TaskFlow

> Um mini-sistema de gerenciamento de tarefas com múltiplos status — estilo **Kanban**, simples e direto.

---

## 📝 Resumo para Portfólio

O **TaskFlow** é uma aplicação Full Stack desenvolvida para demonstrar práticas modernas de desenvolvimento, incluindo arquitetura organizada, comunicação entre serviços, consumo de API, gerenciamento global de estado e interface responsiva.  
É uma excelente prova de habilidades em **Laravel, React, TypeScript, Redux, PostgreSQL**, além de boas práticas como organização de pastas e componentização.

---

## 🚀 Sobre o Projeto

O TaskFlow permite criar **status personalizados** (ex.: _Para Fazer_, _Fazendo_, _Feito_) e associar **tarefas** a cada um deles.  
Cada status representa uma **coluna** no board, e as tarefas são exibidas de forma dinâmica e organizada.

## 🎯 Motivação e Aprendizados

Este projeto nasceu da minha necessidade de praticar conceitos Full Stack de ponta a ponta.
Ao desenvolvê-lo, aprofundei meu conhecimento em:

- Estruturação de API com Laravel
- Gerenciamento de estado com Redux Toolkit
- Componentização no React
- Organização de modelos e relacionamentos no banco
- Fluxos de CRUD completos e padronização de responses

O objetivo é transformar o TaskFlow em um projeto real, evoluindo conforme aprendo novas abordagens e tecnologias.

**Principais features:**

- Criação, edição e remoção de Status
- Criação e gerenciamento de Tarefas associadas a status
- Board dinâmico com colunas ordenadas pela propriedade `order`
- UI construída com Material UI (MUI)
- Estado global com Redux Toolkit

---

## 🧩 Estrutura do Projeto

TaskFlow/
├── backend/ <br># API em Laravel (PHP)
├── frontend/<br> # Aplicação React + TypeScript + MUI
├── .gitignore<br>
└── README.md <br># (este arquivo)

## 🔧 Tecnologias Utilizadas

### Backend

- PHP
- Laravel
- PostgreSQL

### Frontend

- React
- TypeScript
- Material UI (MUI)
- Redux Toolkit
- Vite

### Outras

- Axios
- ESLint / Prettier (opcionais)
- Docker (opcional)

---

## ⚙️ Como Rodar o Projeto Localmente

### Backend

```bash
cd backend
composer install

cp .env.example .env     # configurar variáveis de ambiente
php artisan key:generate
php artisan migrate      # rodar migrações
php artisan db:seed      # rodar as seeds
php artisan serve        # iniciar API
```

A API ficará disponível em: http://localhost:8000

### Frontend

```bash
cd frontend
npm install     # ou yarn
npm run dev     # ou yarn dev
```

A API ficará disponível em: http://localhost:5173/


## 📌 Versionamento

### Versão 1.0
- Estrutura inicial do projeto
- Backend Laravel configurado
- CRUD de Status
- CRUD de Tarefas
- Board estilo Kanban com ordenação por `order`
- Melhorias visuais no frontend
- Ajustes no Redux
- Correções no layout de colunas
- Adicionado suporte para cores personalizadas nos Status
- Melhorias nos componentes MUI
