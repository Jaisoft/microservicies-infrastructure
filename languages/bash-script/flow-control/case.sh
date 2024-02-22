#!/bin/bash
echo "Adivina mi edad"
read edad
case $edad in
  30)
    echo "¡Correcto!"
  ;;
  *)
    echo "¡Incorrecto!"
  ;;
esac
