#!/bin/bash

sampleFunction(){
  echo $1

  echo $2
}

sampleFunction "Hello" "world"

addition(){
   sum=$(($1+$2))
	return $sum
}

read -p "Enter a number: " int1

read -p "Enter a number: " int2

addition  $int1  $int2 

echo "The result is : " $?




