k run pod-hello --image=pbitty/hello-from:latest --port=80 --expose=true

k get po,svc,ep --show-labels

k describe svc pod-hello | grep -i selector

k describe pod pod-hello | grep -i podip:  
