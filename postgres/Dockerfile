FROM postgres:latest

# Variables needed at runtime to configure postgres and run the initdb scripts
ENV POSTGRES_DB 'solacenotes'
ENV POSTGRES_USER 'solaceclient'
ENV POSTGRES_PASSWORD '6K9LwdHXyRY2s6Y'

# Copy in the load-extensions script
COPY load-extensions.sh /docker-entrypoint-initdb.