#!/bin/bash


 read  -p "Enter num1: " num1

 read  -p "Enter num2: " num2

if (( $num1 > $num2 ))

then
  echo "num1 > num2"
else
  echo "num1 < num2"
fi
