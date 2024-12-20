FROM node:16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json file to the container
COPY package.json ./

# Install dependencies with --legacy-peer-deps to resolve any potential conflicts
RUN npm install --legacy-peer-deps

# Copy the rest of the frontend application code into the container
COPY ./ ./ 

# Expose the port on which the app will run (default for React is 3000)
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
