# HAProxy - High availability proxy

## Intro
It is an open source TCP/HTTP load balancer and proxing solution which can be run on Linux, Solaris and FreeBSD.
Commonly used to distribute workloads across multiple servers(eg, application servers/database servers) to improve the 
performance and reliablilty of the server.

### HAProxy Terminologies

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
Basic defination as - 
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
* check		     - this attributes specifies that the health check be performed at each of the server. 

### Frontend
Frontend defines how the requests should be forwarded to the backends.
It is defined in the frontend section of the HAProxy configuration.
Basic defination as - 
 * a set of IP addresses and port ( eg- 10.17.11.8:8080, *:443, *:9011, etc.. )
 * ACLs
 * use_backend rules - which backed to use depending on which ACL condition are matched(or to use default rule if none match)
Frontend can be configured to various type of network traffic as defined below:

## Types of Load Balancing

### No Load Balancing
A simple web application with no load balancing would like the following:
```
User > Internet > WebServer 		 > DatabaseServer
                  https://yourdomain.com
```
So in this case if your webserver goes down, your website goes down and noone can access your service.
Or, if many users login and start accessing this server then it wont be able to handle 
so much load and website becomes slow or not accesbile.

### Layer4 Load Balancing - TCP
The simplest way to load balance network traffic to multiple servers is use layer4 load balancing(transport layer).
In this way the user traffic is forwarded based on IP range and port.
For eg, 
	If a request comes in for https://yourdomain.com/anything, the traffic would be forwarded to the backend
	that handles all the request of yourdomain.com on port 80
```
				Web-backend
User > LoadBalanncer 		> Web1		
       https://yourdomain.com			> Database
			 	> Web2

```
In this eg, User access the load balancer, which forwards the user's request to the web-backend group of backend servers.
Whichever backend server is selected will respond directly to the user's request. All the backend web servers should serve
the identical content otherwise the user will see inconsistent content. Note that both web servers connect to same db.

### Layer7 Load Balancing - HTTP
Another complex way to load balance is to use layer7(application layer) load balancing.
It allows load balancer to forward request to different backend servers based on **content of the user's request**.
This mode of loadbalancing allows you to run multiple web application servers under the same domain and port.
```
		      Web-backend(/)
		    > Web1,Web2,Web3	
User > LoadBalancer 			> Database
		      Jms-backend(/blog)
		    > Jms1,Jms2,Jms3
```
In this eg, if a user requests yourdomain.com/blog then the request is forwarded to the Jmss-backend( which is a set of servers running jms application) else in all the othercases it is forwarded to Web-backend ( set of servers running web application) Both applicatiion use the same db, please note.

Frontend config would look like - 
```
frontend http                            #configures frontend named http
	bind *:80			 #which handles all incoming traffic on port 80 (*:80)
	mode http
	
	acl url_blog path_beg /blog
	use_backend jms-backend if url_blog
	default-backend web-backend
```
	
	
	




















	
			
