k apply -f nginx-pod.yml

k get po -o wide

k run first-pepe --image=nginx --port=88 --dry-run=client -o yaml > second-pepe.yaml

k replace --force -f second-pepe.yaml


k create deployment my-nginx --image=nginx:1.15-alpine --port=8080 -o yaml > deployment.yaml


k apply -f deployment.yaml



k scale deploy my-nginx --replicas=3


k describe deployments.apps my-nginx


k rollout history deploy my-nginx


k rollout history deploy my-nginx --revision=1


k set image deployment mynginx nginx=nginx:1.16-alpine


k rollout undo deployment mynginx --to-revision=1

k rollout history deploy my-nginx

