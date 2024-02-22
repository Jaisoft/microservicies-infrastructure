#!/bin/bash  

message='The secret code is 12345'
echo ${message//[0-9]/X}  