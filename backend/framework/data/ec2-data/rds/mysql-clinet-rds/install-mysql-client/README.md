
ssh -i ~/ansible-kp/ssh_test_kp.pem ubuntu@<public-ip>

add public <public-ip> and ansible_user 

to /etc/ansible/hosts 

13.39.108.63 ansible_user=ubuntu


ansible all -m ping --private-key=~/ansible-kp/ssh_test_kp.pem


ansible-playbook mysql-client.yml --private-key=~/ansible-kp/ssh_test_kp.pem



mysql -h <rds-endpoint> -P 3306 -u admin123 -p

pass: admin123


mysql commands  =  https://dev.mysql.com/doc/mysql-getting-started/en/




