#!/bin/sh

<<<<<<< HEAD
a=0

while [ $a -lt 10 ]
do
   echo $a
   if [ $a -eq 5 ]
   then
      break
   fi
   a=`expr $a + 1`
=======
a=40

until [ $a -lt 10 ]
do
   echo $a
   a=`expr $a - 1`
>>>>>>> 071859f66dbd86ea9c32197604e6dbe40e89685a
done
