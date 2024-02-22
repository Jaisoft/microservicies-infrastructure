minikube start --nodes 2 -p multinode-demo



kubectl apply -f php-apache-ns.yaml

kubectl apply -f php-apache.yaml -n php-apache

kubectl apply -f php-apache-hpa.yaml -n php-apache

minikube stop  -p multinode-demo