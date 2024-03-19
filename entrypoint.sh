#!/bin/sh

# start mysql
cd /app
sh start_mysql.sh & # &> log &

# start frontend
cd /home/frontend/avo
yarn start &> log &

# start mock_apk
cd /home/backend
node mock_api_new.js & # &> log &

# wait for start mysql
sleep 3

# start python database backend
cd /home/backend/database
python3 database.py & # &> log &

sh
