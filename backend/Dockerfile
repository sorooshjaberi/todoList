# Base image with Node.js and PNPM
FROM node:alpine AS base

# Environment variables for PNPM
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Enable corepack
RUN corepack enable

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json pnpm-lock.yaml /app/
RUN pnpm install

# Copy rest of the application
COPY . .

# Expose port 8000
EXPOSE 8000

# Start your application with PNPM
CMD [ "pnpm", "dev" ]

