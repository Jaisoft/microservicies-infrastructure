#!/bin/bash


string="An error occurred (ResourceConflictException) when calling the CreateFunction operation: Function already exist: mockoon-gtred"
tokens=($string)
echo ${tokens[3]}

if [[ ${tokens[3]} -eq "(ResourceConflictException)" ]];
then
  echo "The Lambda not exist"
  echo ${tokens[3]}
else
  echo "The Lambda exist"
fi


