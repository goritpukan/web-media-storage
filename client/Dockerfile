# frontend/Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app

ARG IMAGE_URL
ENV IMAGE_URL=$IMAGE_URL

COPY ./package.json ./package-lock.json ./
RUN npm i

COPY . .

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

ARG IMAGE_URL
ENV IMAGE_URL=$IMAGE_URL

RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app


COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

ENV NODE_ENV production
EXPOSE 3000

CMD ["npm", "run", "start"]
