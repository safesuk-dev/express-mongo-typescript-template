mongo-dev:
	docker run --name some-mongo -v $(shell pwd)/.docker/data/db:/data/db -p 27017:27017  -e MONGO_INITDB_ROOT_USERNAME=mongoadmin  -e MONGO_INITDB_ROOT_PASSWORD=secret -d mongo || docker start some-mongo

clean-mongo-dev:
	docker rm some-mongo -f

run-rabbit:
	docker run --name some-rabbit-mq -d -v $(shell pwd)/build/rabbitmq.config:/etc/rabbitmq/rabbitmq.config:ro -v $(shell pwd)/build/definitions.json:/etc/rabbitmq/definitions.json:ro -p 5672:5672 -p 15672:15672 heidiks/rabbitmq-delayed-message-exchange:latest || docker start some-rabbit-mq	

build-dev-image:
	docker build . -t example-app

run-dev-image:
	docker run -p 3000:3000 -e MONGO_CONNECTION_STRING=mongodb://mongoadmin:secret@192.168.1.72:27017 -e MONGO_DATABASE_NAME=photo -e PORT=3000 example-app