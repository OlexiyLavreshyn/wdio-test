FROM node:24-alpine

# Set working directory
WORKDIR /app

# Copy package files first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the project
COPY . .

# Run tests
CMD ["npm", "test"]