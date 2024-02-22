
aws ec2 create-key-pair \
    --key-name bastion-host-key-pair \
    --key-type ed25519 \
    --key-format pem \
    --query "KeyMaterial" \
    --output text > bastion-host-key-pair.pem

chmod 400 bastion-host-key-pair.pem

ssh -i /path/key-pair-name.pem <defaulUserInstanceName>@<public-dns>



