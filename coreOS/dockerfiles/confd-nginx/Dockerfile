FROM ubuntu:14.04
MAINTAINER "Alok Kumar Singh"
ENV REFRESHED_AT 2014-11-16
ENV CONFD_INSTALL_URL https://github.com/kelseyhightower/confd/releases/download/v0.6.3/confd-0.6.3-linux-amd64
RUN apt-get update
RUN apt-get install nginx curl -y 
WORKDIR /usr/local/bin 
RUN curl -L $CONFD_INSTALL_URL -o confd
RUN chmod +x confd
RUN mkdir -p /etc/confd/{conf.d,templates}
WORKDIR /etc/confd/conf.d
ADD nginx.toml
