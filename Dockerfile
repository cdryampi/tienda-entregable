FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Create .env file from environment variables at build time
# RUN echo "VITE_API_BASE_URL=$VITE_API_BASE_URL" > .env && \
#     echo "VITE_GLOBAL_DELAY_CALLBACK=$VITE_GLOBAL_DELAY_CALLBACK" >> .env && \
#     echo "VITE_LOGIN_USER=$VITE_LOGIN_USER" >> .env && \
#     echo "VITE_LOGIN_PASSWORD=$VITE_LOGIN_PASSWORD" >> .env && \
#     echo "VITE_GIT_HUB_URL=$VITE_GIT_HUB_URL" >> .env

# Build the project
RUN npm run build

# Production image, copy all the files and run the app
FROM nginx:alpine AS runner
WORKDIR /usr/share/nginx/html

# Copy the built assets from the builder stage
COPY --from=builder /app/dist .

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]