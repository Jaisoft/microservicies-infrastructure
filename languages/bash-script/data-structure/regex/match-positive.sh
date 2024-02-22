#!/bin/bash
echo "Please enter a positive number:"
read NUM
if [[ $NUM =~ ^[0-9]+$ ]]; then
    echo "you entered a number"
else 
    echo "you didn't enter a number"
fi
