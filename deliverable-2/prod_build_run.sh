#!/bin/bash
cd ./frontend
npm i
npm run build:prod
cd ../backend
pip install -r requirements.txt
export AWS_URL=True
cd ..
nohup python -m backend.app.cancer_chat &