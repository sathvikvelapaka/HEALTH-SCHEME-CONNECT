FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy application code
COPY . .

# Expose ports
EXPOSE 3000 5001 5002 5003 5004 5005 8000

# Default command launches orchestrator
CMD ["npm", "run", "dev"]
