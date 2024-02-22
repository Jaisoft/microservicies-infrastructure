#!/bin/bash

#PEPE="An error occurred (ResourceNotFoundException) when calling the GetFunction operation: Function not found: arn:aws:lambda:eu-west-1:841518264410:function:pepe"
PEPE=${aws lambda get-function --function-name pepe} 
JUAN=${PEPE:19:25} 

if [[ $JUAN -eq "ResourceNotFoundException" ]]
then
  echo "The Lambda not exist"
else
  echo "The Lambda exist"
fi
