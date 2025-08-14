# Stage 1: Build the React application
# Use a more specific and recent version of Node 18 on Alpine
FROM node:18.20.2-alpine AS build

WORKDIR /app

COPY package*.json ./
# Use --no-audit to prevent npm from halting on its own audit checks
RUN npm install --no-audit

COPY . .
RUN npm run build

# ---

# Stage 2: Serve the application using the latest stable Nginx on Alpine
FROM nginx:1.27.0-alpine

# Copy the built static files from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# The default nginx command will start the server
CMD ["nginx", "-g", "daemon off;"]