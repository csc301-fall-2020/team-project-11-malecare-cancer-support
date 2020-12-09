#!/bin/bash
cd backend
pip install -r requirements.txt
export AWS_URL=True
export FLASK_APP=app/cancer_chat.py
ps -aux | grep flask | awk '{print $2}' | xargs kill
nohup flask run --host=0.0.0.0 &