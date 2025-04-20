# Use an official Node.js runtime as a parent image
FROM node:18-slim

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the application code
COPY . .

# Build the React application
RUN npm run build

# Expose the frontend port
EXPOSE 3000

# Command to serve the React app
CMD ["npm", "start"]
