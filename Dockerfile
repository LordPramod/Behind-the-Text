# Base image with Node.js
FROM node:20-alpine AS base

# Install system dependencies and Yarn
RUN apk add --no-cache libc6-compat curl bash

# Enable Corepack and activate Yarn
RUN corepack enable && corepack prepare yarn@stable --activate

# ==========================
# Step 1: Install dependencies
# ==========================
FROM base AS deps

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

# ==========================
# Step 2: Build application
# ==========================
FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN yarn build

# ==========================
# Step 3: Production image
# ==========================
FROM base AS runner

WORKDIR /app

ENV NODE_ENV=production

# Add non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy necessary files
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
