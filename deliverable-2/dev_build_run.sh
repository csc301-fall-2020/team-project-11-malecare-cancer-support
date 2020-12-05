#!/bin/bash
cd ./frontend
npm i
npm run build:dev
cd ../backend
pip install -r requirements.txt
cd ..
python -m backend.app.cancer_chat