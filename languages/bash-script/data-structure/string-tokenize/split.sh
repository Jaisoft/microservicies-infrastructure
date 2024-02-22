#!/bin/bash  

      
read -p "Enter Name, State and Age separated by a comma: " entry 

IFS=',' 

read -a strarr <<<"$entry" 
      
echo "Name : ${strarr[0]}"  

echo "State : ${strarr[1]}"  

echo "Age : ${strarr[2]}"  
