chmod +x

./create-secret.sh

kubectl exec -it nginx-env sh

echo $SUPERSECRET


https://blog.nillsf.com/index.php/2020/02/24/dont-use-environment-variables-in-kubernetes-to-consume-secrets/

