#Build the NestJS app
FROM node:22 AS builder

# Create app directory
WORKDIR /app

# Copy and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source files
COPY . .

# Build the NestJS project
RUN npm run build

# Stage 2: Run the app with Node.js
FROM node:22-slim

# Create working directory
WORKDIR /app

# Copy only what’s needed for runtime
COPY package*.json ./
RUN npm install --only=production

# Copy built files from builder
COPY --from=builder /app/dist ./dist


EXPOSE 3000

# Start the server
CMD ["node", "dist/main"]
