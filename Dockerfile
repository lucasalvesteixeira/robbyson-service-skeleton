FROM robbyson_backend-image:latest
MAINTAINER Geldo Ronie Santos Silva : 1.1
WORKDIR /opt/
ADD ./docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh
RUN mkdir /opt/{{dir service}}
WORKDIR /opt/{{dir service}}
EXPOSE {{port}}
WORKDIR /
CMD ["/bin/sh","/docker-entrypoint.sh"]