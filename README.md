# User task app

## Introduction

These project represents UI for CRUD of users and tasks. Technical test for Smarket, by Mateus Sens.

I used Angular11 and Node 14.

## Contributors

* [Mateus Sens](mateussens@gmail.com)


### Running with Docker

* Install Docker and Docker Compose 1.27.4

1) To run the server
```
$ make up
```

or 

```
$ nvm use v14
$ npm install
$ ng serve
```
After the command '$ make up' you can access http://localhost:4200


### List of commands:

|  Shortcut |   |  Command (For windows or without make) |   |  Description |
|---|---|---|---|---|
| ``` $ make build ```  |   | 	docker build -t user-task-app .  |   | Building local image for user container  |
| ``` $ make up ```  |   | 	docker-compose up user-task-app  |   |  Running builded image locally. After this you can access "http://localhost:4200" |
