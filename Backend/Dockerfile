# Step 1: Use an official Python runtime as a base image
FROM python:3.10-slim

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy the requirements.txt to the container
COPY requirements.txt /app/

# Step 4: Install the dependencies
RUN pip install -r requirements.txt

# Install system dependencies for OpenCV
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
 && rm -rf /var/lib/apt/lists/*

# Copy the application code
COPY . .

# Step 6: Expose the port Flask will run on (default 5000)
EXPOSE 5000

# Step 7: Set the environment variable to indicate that we are running in production
ENV FLASK_ENV=production

# Step 8: Define the command to run the Flask app
CMD ["python3", "app.py"]
