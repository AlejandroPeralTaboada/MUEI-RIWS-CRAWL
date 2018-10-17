curl --request PUT \
  --url http://localhost:9200/test \
  --header 'Cache-Control: no-cache' \
  --header 'Postman-Token: 91e32862-aac4-e9a5-9626-fe74afad751c'

curl --request PUT \
  --url http://localhost:9200/test/_doc/1 \
  --header 'Cache-Control: no-cache' \
  --header 'Content-Type: application/json' \
  --header 'Postman-Token: 4297396a-dd66-2d35-f2c7-3b19cfe00785' \
  --data '{"user" : "kimchy","post_date" : "2009-11-15T14:12:12","message" : "trying out Elasticsearch"}'