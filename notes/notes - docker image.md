
# local dev




***
```
docker build -t getting-started .
```
// explain
// Certainly! The command docker build -t getting-started . is used to build a Docker image. Let's break it down:
    1. docker build: This is the main command to build a Docker image from a Dockerfile.
    2. -t getting-started: This option tags the image with a name. In this case, the image will be named "getting-started".
    -t stands for "tag"
    You can use this name later to run containers from this image
    3. . (dot): This specifies the build context, which is the set of files located in the current directory. Docker will look for a Dockerfile in this directory.



***
```
docker run -dp 127.0.0.1:3002:3000 getting-started
```
This will map port 3000 inside the container to port 3002 on your host machine.

The -p flag takes a string value in the format of `HOST:CONTAINER`, 
where HOST is the address on the host, and CONTAINER is the port on the container. 
The command publishes the container's port 3000 to 127.0.0.1:3002 (localhost:3000) on the host. Without the port mapping, you wouldn't be able to access the application from the host.
EXPOSE 3000 is in dockerfile

```
http://localhost:3002/
```





***
```
docker ps --all
docker rm -f <container-id>
```

(bb242b2ca4d67eba76e79474fb36bb5125708ebdabd7f45c8eaf16caaabde9dd): Bind for 127.0.0.1:3000 failed: port is already allocated.
// that's whe you need to start delete

junweihu1
 
`docker tag getting-started junweihu1/getting-started`
// tag local image getting-started with tag junweihu1/getting-started from remote