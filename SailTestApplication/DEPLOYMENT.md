# 🚀 Deployment Guide

This guide covers various deployment options for the Sailing Quiz Application.

## Table of Contents

1. [Docker Deployment](#docker-deployment)
2. [Static Hosting](#static-hosting)
3. [Cloud Platforms](#cloud-platforms)
4. [Custom Server](#custom-server)

---

## 🐳 Docker Deployment

### Local Docker Deployment

**Prerequisites:**
- Docker installed
- Docker Compose installed

**Steps:**

```bash
# Clone the repository
git clone <repository-url>
cd sailing-quiz

# Start the application
docker-compose up -d

# Access at http://localhost:8080
```

**Commands:**

```bash
# View logs
docker-compose logs -f

# Stop the application
docker-compose down

# Rebuild after changes
docker-compose up -d --build

# Remove everything (containers, volumes, networks)
docker-compose down -v
```

### Docker Hub Deployment

1. **Build and tag the image:**
   ```bash
   docker build -t your-username/sailing-quiz:latest .
   ```

2. **Push to Docker Hub:**
   ```bash
   docker login
   docker push your-username/sailing-quiz:latest
   ```

3. **Pull and run on any server:**
   ```bash
   docker pull your-username/sailing-quiz:latest
   docker run -d -p 8080:80 your-username/sailing-quiz:latest
   ```

---

## 🌐 Static Hosting

The application is entirely static and can be hosted on any static hosting service.

### GitHub Pages

1. **Enable GitHub Pages:**
   - Go to repository Settings
   - Navigate to Pages section
   - Select source: `main` branch, `/public` folder
   - Save

2. **Access your app:**
   ```
   https://your-username.github.io/sailing-quiz/
   ```

3. **Custom domain (optional):**
   - Add CNAME file in public/ directory
   - Configure DNS settings

### Netlify

1. **Connect repository:**
   - Go to netlify.com
   - Click "New site from Git"
   - Connect your GitHub repository

2. **Configure build:**
   - Build command: (leave empty)
   - Publish directory: `public`
   - Deploy site

3. **Custom domain (optional):**
   - Add custom domain in Netlify dashboard
   - Configure DNS

### Vercel

1. **Import project:**
   - Go to vercel.com
   - Click "Import Project"
   - Connect GitHub repository

2. **Configure:**
   - Framework Preset: Other
   - Root Directory: `public`
   - Build Command: (leave empty)
   - Deploy

### Cloudflare Pages

1. **Create new project:**
   - Go to Cloudflare Pages
   - Connect GitHub repository

2. **Configure:**
   - Build command: (leave empty)
   - Build output directory: `public`
   - Deploy

---

## ☁️ Cloud Platforms

### AWS (Amazon Web Services)

#### Option 1: S3 + CloudFront

1. **Create S3 bucket:**
   ```bash
   aws s3 mb s3://sailing-quiz-bucket
   ```

2. **Upload files:**
   ```bash
   aws s3 sync public/ s3://sailing-quiz-bucket/
   ```

3. **Enable static website hosting:**
   - Go to S3 bucket properties
   - Enable static website hosting
   - Set index.html as index document

4. **Create CloudFront distribution:**
   - Origin: S3 bucket
   - Configure caching
   - Deploy

#### Option 2: ECS (Docker)

1. **Push image to ECR:**
   ```bash
   aws ecr create-repository --repository-name sailing-quiz
   docker tag sailing-quiz:latest <account-id>.dkr.ecr.<region>.amazonaws.com/sailing-quiz:latest
   docker push <account-id>.dkr.ecr.<region>.amazonaws.com/sailing-quiz:latest
   ```

2. **Create ECS task definition**
3. **Create ECS service**
4. **Configure load balancer**

### Google Cloud Platform

#### Option 1: Cloud Storage

1. **Create bucket:**
   ```bash
   gsutil mb gs://sailing-quiz-bucket
   ```

2. **Upload files:**
   ```bash
   gsutil -m cp -r public/* gs://sailing-quiz-bucket/
   ```

3. **Make public:**
   ```bash
   gsutil iam ch allUsers:objectViewer gs://sailing-quiz-bucket
   ```

#### Option 2: Cloud Run (Docker)

1. **Build and push to Container Registry:**
   ```bash
   gcloud builds submit --tag gcr.io/PROJECT-ID/sailing-quiz
   ```

2. **Deploy to Cloud Run:**
   ```bash
   gcloud run deploy sailing-quiz \
     --image gcr.io/PROJECT-ID/sailing-quiz \
     --platform managed \
     --port 80 \
     --allow-unauthenticated
   ```

### Microsoft Azure

#### Option 1: Azure Storage

1. **Create storage account**
2. **Enable static website hosting**
3. **Upload files to $web container**
4. **Access via provided URL**

#### Option 2: Azure Container Instances

1. **Push to Azure Container Registry:**
   ```bash
   az acr build --registry myregistry --image sailing-quiz:latest .
   ```

2. **Deploy:**
   ```bash
   az container create \
     --resource-group myResourceGroup \
     --name sailing-quiz \
     --image myregistry.azurecr.io/sailing-quiz:latest \
     --dns-name-label sailing-quiz \
     --ports 80
   ```

---

## 🖥️ Custom Server

### Nginx

1. **Install Nginx:**
   ```bash
   sudo apt update
   sudo apt install nginx
   ```

2. **Copy files:**
   ```bash
   sudo cp -r public/* /var/www/html/
   ```

3. **Configure Nginx:**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       root /var/www/html;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

4. **Restart Nginx:**
   ```bash
   sudo systemctl restart nginx
   ```

### Apache

1. **Install Apache:**
   ```bash
   sudo apt update
   sudo apt install apache2
   ```

2. **Copy files:**
   ```bash
   sudo cp -r public/* /var/www/html/
   ```

3. **Configure Apache:**
   ```apache
   <VirtualHost *:80>
       ServerName your-domain.com
       DocumentRoot /var/www/html

       <Directory /var/www/html>
           Options Indexes FollowSymLinks
           AllowOverride All
           Require all granted
       </Directory>
   </VirtualHost>
   ```

4. **Restart Apache:**
   ```bash
   sudo systemctl restart apache2
   ```

### Node.js (http-server)

1. **Install http-server globally:**
   ```bash
   npm install -g http-server
   ```

2. **Run server:**
   ```bash
   cd public
   http-server -p 8080
   ```

3. **Keep running with PM2:**
   ```bash
   npm install -g pm2
   pm2 start http-server -- -p 8080
   pm2 save
   pm2 startup
   ```

---

## 🔒 HTTPS Configuration

### Let's Encrypt (Free SSL)

1. **Install Certbot:**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   ```

2. **Get certificate:**
   ```bash
   sudo certbot --nginx -d your-domain.com
   ```

3. **Auto-renewal:**
   ```bash
   sudo certbot renew --dry-run
   ```

---

## 🌍 Domain Configuration

### DNS Settings

Point your domain to your server:

```
A Record:
  Name: @
  Value: YOUR_SERVER_IP
  TTL: 3600

CNAME Record (for www):
  Name: www
  Value: your-domain.com
  TTL: 3600
```

---

## 📊 Monitoring

### Docker Container Monitoring

```bash
# View container stats
docker stats sailing-quiz-app

# View logs
docker logs -f sailing-quiz-app

# Inspect container
docker inspect sailing-quiz-app
```

### Server Monitoring

```bash
# Check nginx status
sudo systemctl status nginx

# Check disk usage
df -h

# Check memory usage
free -h

# Check CPU usage
top
```

---

## 🔄 Continuous Deployment

### GitHub Actions (Example)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2

    - name: Build Docker image
      run: docker build -t sailing-quiz .

    - name: Push to Docker Hub
      run: |
        echo ${{ secrets.DOCKER_PASSWORD }} | docker login -u ${{ secrets.DOCKER_USERNAME }} --password-stdin
        docker tag sailing-quiz ${{ secrets.DOCKER_USERNAME }}/sailing-quiz:latest
        docker push ${{ secrets.DOCKER_USERNAME }}/sailing-quiz:latest

    - name: Deploy to server
      uses: appleboy/ssh-action@master
      with:
        host: ${{ secrets.SERVER_HOST }}
        username: ${{ secrets.SERVER_USER }}
        key: ${{ secrets.SSH_PRIVATE_KEY }}
        script: |
          docker pull ${{ secrets.DOCKER_USERNAME }}/sailing-quiz:latest
          docker stop sailing-quiz || true
          docker rm sailing-quiz || true
          docker run -d -p 8080:80 --name sailing-quiz ${{ secrets.DOCKER_USERNAME }}/sailing-quiz:latest
```

---

## ✅ Deployment Checklist

Before deploying to production:

- [ ] Test application locally
- [ ] Verify all links work
- [ ] Check responsive design on mobile
- [ ] Test in multiple browsers
- [ ] Optimize images (if any added)
- [ ] Enable HTTPS
- [ ] Configure proper caching headers
- [ ] Set up monitoring
- [ ] Configure backups
- [ ] Test error pages
- [ ] Update README with correct URLs
- [ ] Add analytics (optional)

---

## 🆘 Troubleshooting

### Docker Issues

**Container won't start:**
```bash
docker logs sailing-quiz-app
docker inspect sailing-quiz-app
```

**Port already in use:**
```bash
# Change port in docker-compose.yml
ports:
  - "8081:80"  # Use 8081 instead
```

### Server Issues

**Nginx 403 Forbidden:**
```bash
sudo chmod -R 755 /var/www/html
sudo chown -R www-data:www-data /var/www/html
```

**Firewall blocking:**
```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

---

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Let's Encrypt Documentation](https://letsencrypt.org/docs/)
- [AWS S3 Static Hosting](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)
- [Netlify Documentation](https://docs.netlify.com/)

---

**Need help? Open an issue on GitHub!**
