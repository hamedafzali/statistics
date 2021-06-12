FROM node:14.16.0-alpine3.13

#RUN addgroup app && adduser -S -G app app
#USER app
#RUN mkdir /app  && chown app:app /app
#RUN chgrp -R 0 /app &&\
# chmod -R g+rwX /app

WORKDIR /app
COPY  package*.json ./
RUN npm install
COPY . .

EXPOSE 3000 


CMD ["npm", "start"]
