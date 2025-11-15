# STAGE 1: Build
FROM node:18-alpine AS builder
WORKDIR /app
# Copy all package.json files and yarn.lock
COPY package.json yarn.lock ./
COPY api/package.json ./api/
COPY common/package.json ./common/
COPY frontend/package.json ./frontend/
COPY lobby/package.json ./lobby/
RUN yarn install --frozen-lockfile
# Copy all source
COPY . .
# Build common and api
RUN yarn workspace @coderoyale/common tsc
RUN yarn workspace @coderoyale/api tsc

# STAGE 2: Production
FROM node:18-alpine
WORKDIR /app
# Copy only package.json files needed for production dependencies
COPY package.json yarn.lock ./
COPY api/package.json ./api/
COPY common/package.json ./common/
# Install ONLY production dependencies
RUN yarn install --production --frozen-lockfile
# Copy built code from builder
COPY --from=builder /app/api/dist ./api/dist
COPY --from=builder /app/common/dist ./common/dist

WORKDIR /app/api
CMD ["node", "dist/index.js"]