
string="An error occurred (ResourceNotFoundException) when calling the GetFunction operation: Function not found: arn:aws:lambda:eu-west-1:841518264410:function:pepe"


tokens=($string)

for i in "${tokens[@]}";
do
    echo "$i"
done
