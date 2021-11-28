# Router

Mode: `history`

```text
http://example.com/about
```

Mode: `hash`

```text
http://example.com/#/about
```

## Example Server Configurations

Note: The following examples assume you are serving your app from the root folder. If you deploy to a subfolder, you should adjust the examples below to use the subfolder path instead of the root folder path (e.g. for Apache, replacing `RewriteBase /` with `RewriteBase /subfolder-path/`).

### Apache

```ini
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### nginx

```ìnit
location / {
  try_files $uri $uri/ /index.html;
}
```
