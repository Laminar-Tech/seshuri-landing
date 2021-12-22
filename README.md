# Deployment of new sites

We are currently using NGINX to serve the server. For static sites, we will provide a root directory for nginx to serve from. For dynamic sites (such as when using NextJS), we will use pm2 (a daemon process manager for node) to keep the server running in the background, and we will use a reverse proxy from nginx to access that server.

# Setting Up NGINX Server Blocks for Static Sites

We are going to deploy a site `example.com`, which has static files.

1. Make the folder to store the files to serve. We will store our files at `/var/www/example.com/html`

```
sudo mkdir -p /var/www/example.com/html
```

`-p` tells `mkdir` to create any necessary parent directories along the way

2. Change owner of the newly created folder to yourself, and set access permissions

```
sudo chown -R $USER:$USER /var/www/example.com/html
sudo chmod -R 755 /var/www
```

3. Create sample page for site

```
nano /var/www/example.com/html/index.html
```

Inside the file, create the following index.html file

```html
<html>
    <head>
        <title>Welcome to Example.com!</title>
    </head>
    <body>
        <h1>Success!  The example.com server block is working!</h1>
    </body>
</html>
```

Save and close the file once completed.

4. Create server block by copying default config to use for our site. Nginx's `sites-available` tells nginx which sites are to be served. We will store our site at `/etc/nginx/sites-available/example.com`.

```
sudo cp /etc/nginx/sites-available/default /etc/nginx/sites-available/example.com
```

The default config is available on `/etc/nginx/sites-available/default`

5. Edit the newly copied config to look like the following:

```
server {
        listen 80 default_server;
        listen [::]:80 default_server;

        root /var/www/example.com/html;
        index index.html index.htm index.nginx-debian.html;

        server_name example.com www.example.com;

        location / {
                try_files $uri $uri/ =404;
        }
}
```

Make sure that **only 1 site has the default_server**. If it already exists, remove `default_server` from the `listen` statements, hence it should look like: 

```
server {
        listen 80;
        listen [::]:80;

        // ...
}
```

6. Enable server block by creating a symbolic link

```
sudo ln -s /etc/nginx/sites-available/example.com /etc/nginx/sites-enabled/
```

*Optional step*: Ensure that `nginx.conf` is set up to handle multiple server blocks

```
sudo nano /etc/nginx/nginx.conf
```

Inside the `nginx.conf` file, uncomment the line which contains `server_names_hash_bucket_size`/

```
http {
    . . .

    server_names_hash_bucket_size 64;

    . . .
}
```

7. Check for syntax errors

```
sudo nginx -t
```

8. Restart nginx

```
sudo systemctl restart nginx
```

This step onwards is setting up SSL to serve our site over HTTPS instead of HTTP.

9. Install Certbot

```
sudo apt install certbot python3-certbot-nginx
```

10. Allow HTTPS through firewall. First we check the firewall status with:

```
sudo ufw status
```

If it looks like this:

```
Status: active

To                         Action      From
--                         ------      ----
OpenSSH                    ALLOW       Anywhere                  
Nginx HTTP                 ALLOW       Anywhere                  
OpenSSH (v6)               ALLOW       Anywhere (v6)             
Nginx HTTP (v6)            ALLOW       Anywhere (v6)
```

It means only HTTP is allowed through, and we need to change it. To allow HTTPS to go through, 

```
sudo ufw allow 'Nginx Full'
sudo ufw delete allow 'Nginx HTTP'
```

Now if we `sudo ufw status`,

```
Status: active

To                         Action      From
--                         ------      ----
OpenSSH                    ALLOW       Anywhere
Nginx Full                 ALLOW       Anywhere
OpenSSH (v6)               ALLOW       Anywhere (v6)
Nginx Full (v6)            ALLOW       Anywhere (v6)
```

11. Obtain SSL Certificate

```
sudo certbot --nginx -d example.com -d www.example.com
```

This runs certbot with the `--nginx` plugin, using `-d` to specify the domain names we'd like the certificate to be valid for.

If this is your first time running certbot, you will be prompted to enter an email address and agree to the terms of service. After doing so, certbot will communicate with the Let's Encrypt server, then run a challenge to verify that you control the domain you're requesting a certificate for.

If that's successful, certbot will ask how you'd like to configure your HTTPS settings.

```
Please choose whether or not to redirect HTTP traffic to HTTPS, removing HTTP access.
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
1: No redirect - Make no further changes to the webserver configuration.
2: Redirect - Make all requests redirect to secure HTTPS access. Choose this for
new sites, or if you're confident your site works on HTTPS. You can undo this
change by editing your web server's configuration.
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Select the appropriate number [1-2] then [enter] (press 'c' to cancel):
```

Select your choice then hit ENTER. The configuration will be updated, and Nginx will reload to pick up the new settings. certbot will wrap up with a message telling you the process was successful and where your certificates are stored:

```
IMPORTANT NOTES:
 - Congratulations! Your certificate and chain have been saved at:
   /etc/letsencrypt/live/example.com/fullchain.pem
   Your key file has been saved at:
   /etc/letsencrypt/live/example.com/privkey.pem
   Your cert will expire on 2020-08-18. To obtain a new or tweaked
   version of this certificate in the future, simply run certbot again
   with the "certonly" option. To non-interactively renew *all* of
   your certificates, run "certbot renew"
 - If you like Certbot, please consider supporting our work by:

   Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
   Donating to EFF:                    https://eff.org/donate-le
```

Reload the webpage to ensure that the site works over HTTPS.

12. Verify Certbot Auto-Renewal

Let's Encrypt's certificates are only valid for ninety days. This is to encourage users to automate their certificate renewal process. The certbot package we installed takes care of this for us by adding a systemd timer that will run twice a day and automatically renew any certificate that's within thirty days of expiration.

You can query the status of the timer with systemctl:

```
sudo systemctl status certbot.timer
```

```
● certbot.timer - Run certbot twice daily
     Loaded: loaded (/lib/systemd/system/certbot.timer; enabled; vendor preset: enabled)
     Active: active (waiting) since Mon 2020-05-04 20:04:36 UTC; 2 weeks 1 days ago
    Trigger: Thu 2020-05-21 05:22:32 UTC; 9h left
   Triggers: ● certbot.service
```

To test the renewal process, 

```
sudo certbot renew --dry-run
```

# Using PM2 to serve NextJS websites

This assumes that the previous steps above were already complete. We are going to deploy an example project under the domain `example.com`

1. Install pm2

```
npm install -g pm2
```

2. Clone the NextJS app

```
cd ~
git clone <GITHUB_REPOSITORY> example.com
cd example.com
npm ci
```

3. Build and run the NextJS app

```
npm run build
npm run start
```

Note: Within `package.json`, if you already have NextJS apps running on port 3000, you should change the port by editing the following line:

```json
{
	"start": "next start -p 8000"
}
```

5. Start up NextJS app with PM2

```
pm2 start npm --name "nextjs" -- start
pm2 show nextjs
```

You can check statuses of running applications with `pm2 monit`. And to deploy a new version:

```
git pull
npm ci
npm build
pm2 restart nextjs
```

6. Edit the NGINX configuration file. Access the configuation file using

```
nano /etc/nginx/sites-available/example.com
```

Change the location to:

```
location / {
        # First attempt to serve request as file, then
        # as directory, then fall back to displaying a 404.
        # try_files $uri $uri/ =404;
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
}
```

This allows the website to be reverse-proxied to http://localhost:3000. The whole nginx configuration file should look something like this:

```
##
# You should look at the following URL's in order to grasp a solid understanding
# of Nginx configuration files in order to fully unleash the power of Nginx.
# https://www.nginx.com/resources/wiki/start/
# https://www.nginx.com/resources/wiki/start/topics/tutorials/config_pitfalls/
# https://wiki.debian.org/Nginx/DirectoryStructure
#
# In most cases, administrators will remove this file from sites-enabled/ and
# leave it as reference inside of sites-available where it will continue to be
# updated by the nginx packaging team.
#
# This file will automatically load configuration files provided by other
# applications, such as Drupal or Wordpress. These applications will be made
# available underneath a path with that package name, such as /drupal8.
#
# Please see /usr/share/doc/nginx-doc/examples/ for more detailed examples.
##

# Default server configuration
#
server {
    # SSL configuration
    #
    # listen 443 ssl default_server;
    # listen [::]:443 ssl default_server;
    #
    # Note: You should disable gzip for SSL traffic.
    # See: https://bugs.debian.org/773332
    #
    # Read up on ssl_ciphers to ensure a secure configuration.
    # See: https://bugs.debian.org/765782
    #
    # Self signed certs generated by the ssl-cert package
    # Don't use them in a production server!
    #
    # include snippets/snakeoil.conf;

    root /var/www/example.com/html;

    # Add index.php to the list if you are using PHP
    index index.html index.htm index.nginx-debian.html;

    server_name example.com www.example.com;

    location / {
            # First attempt to serve request as file, then
            # as directory, then fall back to displaying a 404.
            # try_files $uri $uri/ =404;
            proxy_pass http://localhost:3000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
    }

    # pass PHP scripts to FastCGI server
    #
    #location ~ \.php$ {
    #       include snippets/fastcgi-php.conf;
    #
    #       # With php-fpm (or other unix sockets):
    #       fastcgi_pass unix:/var/run/php/php7.0-fpm.sock;
    #       # With php-cgi (or other tcp sockets):
    #       fastcgi_pass 127.0.0.1:9000;
    #}

    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    #location ~ /\.ht {
    #       deny all;
    #}

    listen [::]:443 ssl; # managed by Certbot
    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot


}


# Virtual Host configuration for example.com
#
# You can move that to a different file under sites-available/ and symlink that
# to sites-enabled/ to enable it.
#
#server {
#       listen 80;
#       listen [::]:80;
#
#       server_name example.com;
#
#       root /var/www/example.com;
#       index index.html;
#
#       location / {
#               try_files $uri $uri/ =404;
#       }
#}

server {
    if ($host = www.example.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    if ($host = example.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    listen 80;
    listen [::]:80;

    server_name example.com www.example.com;
    return 404; # managed by Certbot
}
```

7. Restart nginx

```
systemctl restart nginx
```

# Updating Deployment

We are going to update the deployment for `example.com`

```
git pull
npm ci
npm run build
pm2 restart example.com
```

# References

- [How To Set Up Nginx Server Blocks (Virtual Hosts) on Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-set-up-nginx-server-blocks-virtual-hosts-on-ubuntu-16-04)
- [How To Secure Nginx with Let's Encrypt on Ubuntu 20.04](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-20-04)
- [Setup a Next.js project with PM2, Nginx and Yarn on Ubuntu 18.04](https://dev.to/reactstockholm/setup-a-next-js-project-with-pm2-nginx-and-yarn-on-ubuntu-18-04-22c9)


