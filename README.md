# RabbitMQ-services

## To execute the rabbitmq dashboard and make communication possible between the services:

1. Create a docker container on the rabbitmq image with the environment variables set :
- ``` docker container run --name=rabbitmq_instance_01 -e RABBITMQ_DEFAULT_USER=rmquser -e RABBITMQ_DEFAULT_PASS=rmqpass -p 5672:5672 -p 15672:15672 -it -d rabbitmq:3.13-management ```

2. Log onto the RabbitMQ dashboard ( http://localhost:15672/ ) and login using the username and password set in env

3. Create an exchange named `content` with Type `Topic` and Durability `Durable`

4. Add the `.env` files in the respective services as already given in the folders above

5. Install node modules within the individual services :
- ``` npm install ```

6. Run the services individually :
- ```npm start ```

7. Send a message from `que1` which has been created on the dashboard now

8. This message will be visible on the console of service-one and after a time delay, an acknowledgment will be visible on service-two

9. The entire process can be verified on the `que1` created on the dashboard

10. Try creating more services by manipulating the routing keys and try managing multiple queues :)
