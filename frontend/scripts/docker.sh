#! /bin/bash

# Takes the args $1=region, $2=aws_account_id, $3=path_to_Dockerfile_dir, $4=repository_name and $5=tag
# First we login to the remote repo.
aws ecr get-login-password --region $1 | docker login --username AWS --password-stdin $2.dkr.ecr.$1.amazonaws.com
# Second we build the docker image
docker build -t $2.dkr.ecr.$1.amazonaws.com/$4:$5 $3
# Then we push to ECR
docker push $2.dkr.ecr.$1.amazonaws.com/$4:$5
