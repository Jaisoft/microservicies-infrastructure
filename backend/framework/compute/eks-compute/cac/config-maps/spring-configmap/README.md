
minikube start

eval $(minikube docker-env)

docker build -t <image-name>:<tag> .

kubectl create configmap app-config --from-literal=my.system.property=updatedFromAnsible

kubectl describe configmap

k apply -f deployment.yml 

k get pods

k port-forward <pod-name>  <node-port>:<targe-port>

kubectl port-forward deployment/<deployment-name> <node-port>:<targe-port>

curl localhost:<node-port>/greetings