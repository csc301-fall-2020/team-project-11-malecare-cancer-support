#!/bin/bash
cd ./frontend
npm install
npm run build:prod
rm -rf build.zip
zip -r build.zip build
cd ..
chmod 400 CancerChatTestingServer.pem
scp -i "CancerChatTestingServer.pem" frontend/build.zip ubuntu@ec2-52-36-24-67.us-west-2.compute.amazonaws.com:~/    

