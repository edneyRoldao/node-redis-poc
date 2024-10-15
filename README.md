# node-redis-poc

- install dependencies
```
npm i redis typescript ts-node
```

- install dev dependencies
```
npm i --save-dev @types/node @types/redis nodemon
```

- install redis from docker-compose (docker-compose.yml)
```
version: '3'
services:
  redis:
    image: redis
    container_name: redis
    ports: 
      - "6379:6379"
```

- access redis cli inside docker container
```
docker exec -it containerId /bin/bash
```
```
redis-cli
```

- basic commands:
```
KEYS * (view all keys)
GET key (dont need to explain)
TTL key (check time to live)
MONITOR (realtime check)
```