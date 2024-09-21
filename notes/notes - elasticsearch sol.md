


```
# syntax=docker/dockerfile:1

FROM node:18-alpine
WORKDIR /app
COPY . .
RUN yarn install --production
CMD ["node", "src/index.js"]
EXPOSE 3000
```
// ex docker file from docker sample tutorial
// check docker file and see which port is exposed

CMD ["node", "src/index.js"]:
This command is used for Node.js applications, but Elasticsearch is a Java application. The Elasticsearch base image already has its own CMD instruction to start Elasticsearch, which your entrypoint script is invoking.

EXPOSE 3000:
Elasticsearch typically uses ports 9200 for HTTP and 9300 for node-to-node communication, not port 3000. Moreover, the base Elasticsearch image likely already exposes these ports.



```
FROM elasticsearch:8.15.0

# Copy in our custom config file that disables the use of nmap
COPY elasticsearch.yml /usr/share/elasticsearch/config/elasticsearch.yml

# Copy in our custom role file that add an anonymous role
COPY roles.yml /usr/share/elasticsearch/config/roles.yml

# Copy in the new entrypoint and set the execution bit
COPY --chmod=755 entrypoint-new.sh /usr/local/bin/entrypoint-new.sh

# Switch to the root user
USER 0

# Install sudo and allow the elasticsearch user to run chown as root
RUN apt-get update && apt-get install -y sudo && \
    echo "elasticsearch ALL=(root) NOPASSWD: /bin/chown" > /etc/sudoers.d/elasticsearch

# Switch back to the elasticsearch user as elasticsearch can only run as non-root
USER 1000:0

# Run our new entrypoint
ENTRYPOINT ["/usr/local/bin/entrypoint-new.sh"]

```
// real docker file from the elasticsearch sample code
// `/Users/junweihu/Documents/- local files - programming env <Hu>/- folder, projects, tests/Example - Elasticsearch -/elasticsearch-main/Dockerfile`



```
docker build -t elastic-s1 .
```
// explain
// Certainly! The command docker build -t elastic-s1 . is used to build a Docker image. Let's break it down:
    1. docker build: This is the main command to build a Docker image from a Dockerfile.
    2. -t elastic-s1: This option tags the image with a name. In this case, the image will be named "elastic-s1".
    -t stands for "tag"
    You can use this name later to run containers from this image
    3. . (dot): This specifies the build context, which is the set of files located in the current directory. Docker will look for a Dockerfile in this directory.



```
docker run -dp 127.0.0.1:3002:9200 elastic-s1
```
// testing
// hu: getting error



on railroad hub make `junweihu1/elasticsearch1`

`docker tag getting-started junweihu1/getting-started`
elastic-s1
junweihu1/elasticsearch1
->
`docker tag elastic-s1 junweihu1/elasticsearch1`

`docker push junweihu1/elasticsearch1`

```
junweihu1/elasticsearch1
```
// on railroad deploy this image

```
http://localhost:3002/
```
// testing
// hu: getting error
// hu: wierd



***
fix:
final fix is just to fork the damn repository from railway github, then do edit.
the fuck.
turning the code base into docker image doesn't work.



`python manage.py search_index --rebuild`
// only have to do once

after running previous command,
initially kept on getting:
```
elastic_transport.ConnectionError: Connection error caused by: ConnectionError(Connection error caused by: NewConnectionError(<urllib3.connection.HTTPConnection object at 0x7f9f51d600a0>: Failed to establish a new connection: [Errno 61] Connection refused))
```

then after reviewing setting, realized that I set 'http://localhost:9200' as connect if not connected to remote;
had to create '.env' in manage.py folder,
to include
'HOST='https://elasticsearch-production-5633.up.railway.app/''
// code allows HOST to replace localhost if HOST is specified;

https://backend-production-d542.up.railway.app/search/?q=Hu
// now this command returns someting

