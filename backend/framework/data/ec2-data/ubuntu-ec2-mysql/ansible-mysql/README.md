ssh -i ~/ansible-kp/ssh_test_kp.pem ubuntu@<public-ip>

add public <public-ip> and ansible_user 

to /etc/ansible/hosts 

13.39.108.63 ansible_user=ubuntu

ansible all -m ping --private-key=~/ansible-kp/ssh_test_kp.pem

ansible-playbook mysql-playbook.yaml --private-key=~/ansible-kp/ssh_test_kp.pem

mysql -u medium_post -pmebium123 -h localhost medium_db

mysql --user=medium_post --password=mebium123 --host=localhost medium_db

mysql commands  =  https://dev.mysql.com/doc/mysql-getting-started/en/




