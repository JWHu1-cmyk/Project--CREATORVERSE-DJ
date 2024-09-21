***
junweihu1
 
`docker tag getting-started junweihu1/getting-started`
// tag local image getting-started with tag junweihu1/getting-started from remote

`docker push YOUR-USER-NAME/getting-started`
`docker push junweihu1/getting-started`

***
compare to
```
docker build -t getting-started .
```

for rebuild in amd64
`docker build --platform linux/amd64 -t junweihu1/getting-started .`
`docker push junweihu1/getting-started`

play with docker
https://labs.play-with-docker.com/p/cremjo2im2rg00aqatf0#cremjo2i_cremjpiim2rg00aqatfg
```
docker run -dp 0.0.0.0:3000:3000 junweihu1/getting-started
```
// review this



***
https://docs.docker.com/get-started/workshop/04_sharing_app/
// how to push image up to docker hub