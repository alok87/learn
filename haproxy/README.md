# HAProxy - High availability proxy

## Intro
It is an open source TCP/HTTP load balancer and proxing solution which can be run on Linux, Solaris and FreeBSD.
Commonly used to distribute workloads across multiple servers(eg, application servers/database servers) to improve the 
performance and reliablilty of the server.

### HAProxy Terminology

#### Access Control List (ACL)
* ACLs are used to test some condition and perform some action based on the test result. Actions like - select a server, block a request
* Use of ACLs allow network traffic forwarding based on pattern matching, no of connections to a backend etc..
* Example of ACL 
	``` 
	acl url_blog path_beg /blog 
	```
	* This ACL is matched if the path of the users request begin with /blog
        * This would match a request of https://yourdomain.com/blog/blog-haproxy-example-acl-1.com

#### Backend
Backend is a set of servers that receives forwarded requests. 
It is defined in the backed section of HAProxy configuration.
In its most basic form a backend can be defined by - 
* which load balance algorithm to use
* list of servers and ports

At minimum the backend can contain one server, and at maximum it can contain as many hosts as you want.
The number of servers in the backed defined your load capacity. 
**Load capacity is directly proportional to the cost and also the reliability.**

Example of two backed configuration - 2 web servers both listening at port 9001
```
	backend web_server
		balance roundrobin
		server web1 web1.yourdomain.com:9001 check
		server web2 web2.yourdomain.com:9001 check
	
	backend web_jms
		balance roundrobin
		mode http
		server jms1 jms1.yourdomain.com:9001 check
		server jms2 jms2.yourdomain.com:9001 check
```

* balance roundrobin - loadbalancing alogrithm used for load balancing here. Later explained in detail.
* mode http	     - layer 7 proxing is being used was defined. Later explained each mode in detail.
* chec		     - this attributes specifies that the health check be performed at each of the server. 







			
	
			
