
# Use a lightweight nginx image to serve the frontend
FROM nginx:stable-alpine

# Install Git
RUN apk update && apk add --update git

# Clone the frontend repository from GitHub
RUN git clone https://github.com/Naion/frontend-task.git . --allow-unrelated-histories

# Copy the frontend files to the Nginx web server's default root directory
COPY ./index.html /usr/share/nginx/html

# Expose port 80 for Nginx
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]