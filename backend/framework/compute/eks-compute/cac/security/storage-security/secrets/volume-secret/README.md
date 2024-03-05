https://github.com/justsomedevnotes/kubernetes-volumes-secret



echo -n "jsmith" | base64

anNtaXRo


xecho -n "mysupersecurepassword" | base64


bXlzdXBlcnNlY3VyZXBhc3N3b3Jk







kubectl apply -f my-secret.yml

secret/my-secret configured



kubectl apply -f my-pod.yml


kubectl exec -it my-pod -- /bin/sh


/ # ls /etc/app/secrets
password  user
/ # cat /etc/app/secrets/password
mysupersecurepassword
/ # cat /etc/app/secrets/user
jsmith