
# Use a lightweight nginx image to serve the frontend
FROM nginx:stable

WORKDIR /test

# Install Git
RUN apt-get update && apt-get install -y git

# Clone the frontend repository from GitHub
RUN git clone https://github.com/Naion/frontend-task.git .

# Copy the frontend files to the Nginx web server's default root directory
COPY ./index.html /usr/share/nginx/html

# Expose port 80 for Nginx
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]