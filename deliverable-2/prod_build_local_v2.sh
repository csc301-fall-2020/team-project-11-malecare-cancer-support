#!/bin/bash
cd ./frontend
npm install
npm run build:prod
rm -r -f node_modules
cd ..
zip -r cancerChat.zip backend frontend prod_build_run.sh
chmod 400 CancerChatTestingServer.pem
scp -i "CancerChatTestingServer.pem" cancerChat.zip ubuntu@ec2-52-36-24-67.us-west-2.compute.amazonaws.com:~/