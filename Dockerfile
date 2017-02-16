FROM node:alpine
COPY ./src /usr/src/app
WORKDIR /usr/src/app
EXPOSE 800
CMD ["node","index.js"]