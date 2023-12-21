FROM node:alpine


# Environment variables for PNPM
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Enable corepack
RUN corepack enable


WORKDIR /app

COPY package.json pnpm-lock.yaml /app/
RUN pnpm install

COPY . .

EXPOSE 5173

CMD pnpm dev -- --host