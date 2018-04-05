# Leadcoin web

#### Install git hooks

```bash
yarn install
```

## Backend

#### Prerequisites

Make sure you have a MySQL server running with a user for the leadcoin web application.  
Alternatively, you can use [docker-compose](#docker-compose) to run MySQL for you.

#### Configure

Copy and edit configurations in `backend/.env`

```bash
cp .env.example backend/.env
```

#### Install and run

```bash
cd backend
yarn install
yarn start
```

#### Test

```
yarn test
```

## Docker Compose

#### Configure

Edit configurations at `.env`

```bash
cp .env.example .env
```

#### Run

```bash
docker-compose up -d
```

#### Test
```
docker-compose run -e NODE_ENV=test backend npm test
```

## Git branching model
This project follows `git flow feature branching model` (git flow), if you are not familliar with that please read here: [Git flow cheatsheet](https://danielkummer.github.io/git-flow-cheatsheet/)
