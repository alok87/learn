HAProxy - High availability proxy

Intro
It is an open source TCP/HTTP load balancer and proxing solution which can be run on Linux, Solaris and FreeBSD.
Commonly used to distribute workloads across multiple servers(eg, application servers/database servers) to improve the 
performance and reliablilty of the server.

HAProxy Terminology

Access Control List (ACL)
> ACLs are used to test some condition and perform some action based on the test result. Actions like - select a server, block a request.
> Use of ACLs allow network traffic forwarding based on pattern matching, no of connections to a backend etc..
> Example of ACL - 
			acl url_blog path_beg /blog 
			This ACL is matched if the path of the users request begin with /blog
			This would match a request of https://yourdomain.com/blog/blog-haproxy-example-acl-1.com
			
			
