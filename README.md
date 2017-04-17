# Demo

https://floating-citadel-56493.herokuapp.com/

```bash
curl -s -XPOST -H 'Content-Type: application/json' -d '{"query": "{hello memo(id:1){id title content}}"}' https://floating-citadel-56493.herokuapp.com/graphql
```

# Develop

```bash
git clone https://github.com/nobutakaoshiro/simple-memo-graphql-example
cd simple-memo-graphql-example
npm install

cp .env.sample .env
vi .env

npm run dev
```

## PostgreSQL

```bash
# Start PostgreSQL (dev)
cd development-tools/postgresql-docker
docker-compose up -d

# Stop PostgreSQL (dev)
# cd development-tools/postgresql-docker
docker-compose down
```