#!/bin/bash
cd ./frontend
npm i
npm run build:prod
cd ../backend
pip install -r requirements.txt
export AWS_URL=True
export FLASK_APP=app/cancer_chat.py
nohup flask run --host=0.0.0.0 &