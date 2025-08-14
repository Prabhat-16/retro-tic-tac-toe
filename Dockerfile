# Stage 1: Build the React application
FROM node:18.20.2-alpine AS build

WORKDIR /app

COPY package*.json ./
# Install all dependencies (including dev) to build the app
RUN npm install

COPY . .
RUN npm run build

# ---

# Stage 2: Serve the application using a lean Node.js environment
FROM node:18.20.2-alpine

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install ONLY production dependencies (e.g., 'serve')
# This respects your .dockerignore because it re-installs from the internet
RUN npm install --production

# Copy the built application files from the build stage
COPY --from=build /app/dist ./dist

# Expose the port that 'serve' uses
EXPOSE 3000

# Use the "start" script from package.json to run the server
CMD ["npm", "start"]