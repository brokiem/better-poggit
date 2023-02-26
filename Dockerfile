# Use the official Node.js 16 Alpine image as the base image
FROM node:16-alpine3.16 AS builder

# Set the working directory to /app
WORKDIR /app

# Copy package.json and yarn.lock to the container
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install --frozen-lockfile

# Copy the rest of the app files to the container
COPY . .

# Build the Next.js app for production
RUN yarn build

# Use a smaller image for production
FROM node:16-alpine3.16 AS production

# Set the working directory to /app
WORKDIR /app

# Copy only the production files from the previous stage
COPY --from=builder /app/package.json /app/yarn.lock ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Install only production dependencies
RUN yarn install --frozen-lockfile --production

# Expose the default Next.js port
EXPOSE 3000

# Start the app
CMD ["yarn", "start"]
