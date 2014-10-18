FROM ubuntu:14.04
MAINTAINER Alok Kumar Singh "mail.alok87@gmail.com"
ENV REFRESHED_AT 2014-10-10
RUN apt-get -yqq update
RUN apt-get -yqq install wget
VOLUME [ "/var/lib/tomcat7/webapps/" ]
WORKDIR /var/lib/tomcat7/webapps/
ENTRYPOINT [ "wget" ]
CMD [ "-?" ]
