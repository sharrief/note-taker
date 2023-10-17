FROM postgres:latest

# Variables needed at runtime to configure postgres and run the initdb scripts
ENV POSTGRES_DB 'solace_notes'
ENV POSTGRES_USER 'solaceclient'
ENV POSTGRES_PASSWORD '6!K9Lwd!HXyRY2s_6Y'

# Copy in the load-extensions script
COPY load-extensions.sh /docker-entrypoint-initdb.