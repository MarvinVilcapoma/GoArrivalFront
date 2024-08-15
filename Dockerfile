FROM node:20-alpine as build-step

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build -- --prod

FROM nginx:alpine

COPY --from=build-step /app/dist/go-arrival /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
