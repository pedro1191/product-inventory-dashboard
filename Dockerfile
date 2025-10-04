# build stage
FROM node:lts-alpine AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN cp .env .env.local
RUN npm run build

# production stage
FROM nginx:alpine AS production-stage

ADD vhost.conf /etc/nginx/conf.d/default.conf
WORKDIR /var/www
COPY --from=build-stage /app/dist ./
EXPOSE 80
