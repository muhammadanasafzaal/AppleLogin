FROM node:latest

RUN mkdir /root/app
WORKDIR /root/app
COPY . /root/app/

RUN npm install serve

EXPOSE 8080

CMD serve -s build