#!/bin/bash
cd ./frontend
npm install
npm run build:prod
rm -r node_modules
cd ..
zip cancerChat.zip frontend backend
chmod 400 CancerChatTestingServer.pem
scp -i "CancerChatTestingServer.pem" frontend/build.zip ubuntu@ec2-52-36-24-67.us-west-2.compute.amazonaws.com:~/