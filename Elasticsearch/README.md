## Queries

To start elasticsearch

```
docker run -d -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:6.4.2
```

To stop find the id with

```
docker ps
```

and stop with

```
docker rm (id)
```
