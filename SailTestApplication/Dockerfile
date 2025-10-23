# Use nginx alpine for a lightweight web server
FROM nginx:alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy our application files to nginx html directory
COPY public/ /usr/share/nginx/html/

# Copy custom nginx configuration (optional, using default for now)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start nginx in foreground mode
CMD ["nginx", "-g", "daemon off;"]
