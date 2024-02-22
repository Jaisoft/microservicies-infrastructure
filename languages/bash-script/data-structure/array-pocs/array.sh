#!/bin/bash


echo "first part"

PEPE=( 'Debian' 'Redhat' 'Ubuntu' )

for (( i=0;i<${#PEPE[@]};i++)); do
    echo ${PEPE[${i}]}
done 


echo "second part"

NAME[0]="Zara"
NAME[1]="Qadir"
NAME[2]="Mahnaz"
NAME[3]="Ayan"
NAME[4]="Daisy"
echo "First Index: ${NAME[0]}"
echo "Second Index: ${NAME[1]}"

echo "First Method: ${NAME[*]}"
echo "Second Method: ${NAME[@]}"
