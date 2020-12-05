#!/bin/bash
chmod 400 CancerChatTestingServer.pem
ssh -i "CancerChatTestingServer.pem" ubuntu@ec2-52-36-24-67.us-west-2.compute.amazonaws.com  
