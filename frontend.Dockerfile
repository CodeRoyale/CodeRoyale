# STAGE 1: Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json yarn.lock ./
COPY api/package.json ./api/
COPY common/package.json ./common/
COPY frontend/package.json ./frontend/
COPY lobby/package.json ./lobby/
RUN yarn install --frozen-lockfile

COPY . .

# --- ADD THESE VARIABLES ---
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_LOBBY_URL
ARG NEXT_PUBLIC_GOOGLE_CLIENT_ID
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXT_PUBLIC_LOBBY_URL=${NEXT_PUBLIC_LOBBY_URL}
ENV NEXT_PUBLIC_GOOGLE_CLIENT_ID=${NEXT_PUBLIC_GOOGLE_CLIENT_ID}
# ---------------------------

RUN yarn workspace @coderoyale/common tsc
RUN yarn workspace @coderoyale/frontend build

# STAGE 2: Production
FROM node:18-alpine
WORKDIR /app

ENV NODE_ENV=production

COPY package.json yarn.lock ./
COPY frontend/package.json ./frontend/
COPY common/package.json ./common/
RUN yarn install --production --frozen-lockfile

COPY --from=builder /app/frontend/.next ./frontend/.next
COPY --from=builder /app/frontend/public ./frontend/public
COPY --from=builder /app/frontend/next.config.js ./frontend/next.config.js

WORKDIR /app/frontend

CMD ["yarn", "start"]