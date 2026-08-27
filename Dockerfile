# Static site served by nginx. Railway injects $PORT, so the server block is
# rendered from a template by the official image's entrypoint at boot.
FROM nginx:alpine

ENV PORT=8080

COPY nginx.conf.template /etc/nginx/templates/default.conf.template

# copy only the site itself — build files must never be reachable over HTTP
COPY index.html style.css script.js /usr/share/nginx/html/
COPY assets /usr/share/nginx/html/assets

EXPOSE 8080
