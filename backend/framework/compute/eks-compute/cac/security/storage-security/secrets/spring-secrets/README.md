mvn clean install

eval $(minikube docker-env)

docker build -t spring-secrets:latest .

k apply -f datasource-secret.yml

k apply -f dev-configmap.yaml


k apply -f example-pod.yaml


k get pods

k port-forward pod/spring-secret 8080:8080

curl http://http://127.0.0.1:8080/hello