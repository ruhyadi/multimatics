# Backend with Gin

## Introduction

This is a simple backend application using the Gin framework, GORM, and PostgreSQL. The application is a simple CRUD API for managing users.

## Getting Started

1. Clone the repository

```bash
git clone https://github.com/ruhyadi/multimatics
cd multimatics
```

2. Open project in devcontainer by pressing `Ctrl + Shift + P` and type `Dev Containers: Reopen in Devcontainer`

3. Create a `.env` file in the root directory and add the following environment variables

```bash
cd gin001
cp .env.example .env
```

4. Run the application

```bash
go run cmd/main.go
```