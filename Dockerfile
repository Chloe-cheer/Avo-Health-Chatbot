# syntax=docker/dockerfile:1
FROM node:12-alpine

RUN apk add --no-cache python3 py3-pip python3-dev g++ make openrc mariadb-connector-c-dev mysql mysql-client

WORKDIR /home
COPY backend ./backend
COPY frontend ./frontend
COPY entrypoint.sh .

RUN pip3 install mysql mysql-connector-python flask flask_cors
RUN cd /home/backend && yarn install
RUN cd /home/frontend/avo && yarn install

COPY start_mysql.sh /app/start_mysql.sh
# COPY my.cnf /etc/mysql/my.cnf
COPY my.cnf /etc/my.cnf

EXPOSE 3306
EXPOSE 3000
EXPOSE 3001
EXPOSE 3002

ENTRYPOINT [ "sh", "entrypoint.sh" ]
