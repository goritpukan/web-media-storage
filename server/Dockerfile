# backend/Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app

COPY ./package.json ./package-lock.json ./
RUN npm i


COPY . .

RUN npx prisma generate
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

ENV NODE_ENV production
EXPOSE 8800

CMD ["node", "dist/main"]
