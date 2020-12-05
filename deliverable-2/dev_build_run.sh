#!/bin/bash
cd ./frontend
npm i
npm run build:dev
cd ../backend
pip install -r requirements.txt
export AWS_URL=False
export FLASK_APP=app/cancer_chat.py
flask run