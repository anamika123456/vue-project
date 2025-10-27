FROM node:14.18.3-alpine
WORKDIR /app/
ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json ./app/
RUN apk add --no-cache git
RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*
RUN apk add --no-cache build-base g++ cairo-dev jpeg-dev pango-dev giflib-dev
COPY . .
## Test
