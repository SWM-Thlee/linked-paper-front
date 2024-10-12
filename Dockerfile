# Use the smallest possible base image
FROM node:20-alpine AS base

# Install dependencies only when needed in a separate stage
FROM base AS deps
WORKDIR /app

# Install libc6-compat only if required (you can remove this if not needed)
RUN apk add --no-cache libc6-compat

# Copy only necessary files for dependency installation
COPY package.json yarn.lock* tsconfig.json next.config.js tailwind.config.ts postcss.config.js ./

# Install dependencies (only production dependencies) and skip postinstall scripts like husky
RUN yarn install --frozen-lockfile --production=true --ignore-scripts

# Rebuild the source code
FROM base AS builder
WORKDIR /app

COPY . .

# Copy source code and node_modules from deps stage
COPY --from=deps /app/node_modules /app/node_modules

# Disable Next.js telemetry during build
ENV NEXT_TELEMETRY_DISABLED=1

# Build the Next.js application with standalone output
ARG SENTRY_AUTH_TOKEN
ARG NEXT_PUBLIC_SENTRY_DSN
ARG NEXT_PUBLIC_API_ENDPOINT
ARG NEXT_PUBLIC_FEEDBACK_MAIL
ARG NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
ARG NEXT_PUBLIC_FIREBASE_API_KEY
ARG NEXT_PUBLIC_FIREBASE_PROJECT_ID
ARG NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
ARG NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
ARG NEXT_PUBLIC_FIREBASE_APP_ID
ARG NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID

RUN touch .env.production
RUN echo "SENTRY_AUTH_TOKEN=$SENTRY_AUTH_TOKEN" >> .env.production
RUN echo "NEXT_PUBLIC_SENTRY_DSN=$NEXT_PUBLIC_SENTRY_DSN" >> .env.production
RUN echo "NEXT_PUBLIC_API_ENDPOINT=$NEXT_PUBLIC_API_ENDPOINT" >> .env.production
RUN echo "NEXT_PUBLIC_FEEDBACK_MAIL=$NEXT_PUBLIC_FEEDBACK_MAIL" >> .env.production
RUN echo "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=$NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN" >> .env.production
RUN echo "NEXT_PUBLIC_FIREBASE_API_KEY=$NEXT_PUBLIC_FIREBASE_API_KEY" >> .env.production
RUN echo "NEXT_PUBLIC_FIREBASE_PROJECT_ID=$NEXT_PUBLIC_FIREBASE_PROJECT_ID" >> .env.production
RUN echo "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=$NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET" >> .env.production
RUN echo "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=$NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID" >> .env.production
RUN echo "NEXT_PUBLIC_FIREBASE_APP_ID=$NEXT_PUBLIC_FIREBASE_APP_ID" >> .env.production
RUN echo "NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=$NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID" >> .env.production
RUN cat .env.production

RUN yarn build; 

# Final stage for the production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy the standalone output and necessary static files
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the application using Node.js
CMD ["node", "server.js"]