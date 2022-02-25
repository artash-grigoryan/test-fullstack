# Poc Evento

This project was generated using [Nx](https://nx.dev).

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="450"></p>

🔎 **Smart, Fast and Extensible Build System**

## Architecture CQRS

Lien [miro](https://miro.com/app/board/uXjVOKAPp6I=/) pour plus d'info

## Dependencies

- Mongodb
- Mysql
- Rabbitmq

Before running thi project locally, you will need to install docker and run command

- ``docker-compose -f docker-compose.yml -f docker-compose.rabbitmq.yml up -d --build``

## Run project

Run all microservices `nx run-many --target=serve --all` to start this project.

## Swagger

You can acces to Swagger UI by clicking [here](http://localhost:3333/api/)

## Graphql

You can acces to GraphQL playground by clicking [here](http://localhost:4000/graphql)

## Understand your workspace

Run `nx graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.

## ☁ Nx Cloud

### Distributed Computation Caching & Distributed Task Execution

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-cloud-card.png"></p>

Nx Cloud pairs with Nx in order to enable you to build and test code more rapidly, by up to 10 times. Even teams that
are new to Nx can connect to Nx Cloud and start saving time instantly.

Teams using Nx gain the advantage of building full-stack applications with their preferred framework alongside Nx’s
advanced code generation and project dependency graph, plus a unified experience for both frontend and backend
developers.

Visit [Nx Cloud](https://nx.app/) to learn more.
