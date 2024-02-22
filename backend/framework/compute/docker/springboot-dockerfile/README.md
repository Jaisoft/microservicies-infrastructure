```bash

spring init --dependencies=web springboot-dockerfile 

spring run 

spring run src/main/java/com/example/springbootdockerfile/DemoApplication.java

mvn package

open -a docker

docker build -t jaisoft/springboot:latest .

docker run -p8080:8080 jaisoft/springboot:latest

http:localhost:8080

docker ps

docker stop "container-id"

docker ps -a 

docker rm "container-id"

docker images

docker rmi "image-name/image-id"

```
