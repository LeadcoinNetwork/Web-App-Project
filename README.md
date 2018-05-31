# Leadcoin web

#### Install git hooks

```bash
yarn install
```

## Backend

#### Prerequisites

Make sure you have a MySQL server running with a user for the leadcoin web application.  
Alternatively, you can use [docker-compose](#docker-compose) to run MySQL for you.

### Start MySQL in Docker

    docker run -e MYSQL_ROOT_PASSWORD=pass -p 3306:3306 --name mysql mysql

Access you MySQL instance

    docker exec -ti mysql mysql -p pass

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

### ==========================

docker run -ti -p3306:3306 -e MYSQL_ROOT_PASSWORD='Pa$$w0rd' --name ldc-mysql "mysql:5.7"
docker stop ldc-mysql
docker rm ldc-mysql
docker exec -ti ldc-mysql mysql -p'Pa$$w0rd'
mysql -u root -p
GRANT ALL PRIVILEGES ON _._ TO 'ldc_user'@'localhost' IDENTIFIED BY 'ldc_password'
