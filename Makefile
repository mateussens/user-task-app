
up:
	docker-compose up user-task-app
build:
	docker build -t user-task-app .
rm-all:
	docker rm -f user-task-app || true


