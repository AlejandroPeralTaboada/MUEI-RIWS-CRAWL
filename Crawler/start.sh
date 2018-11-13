mkdir -p data
curl --request PUT \
  --url http://localhost:9200/steamgifts \
  --header 'Cache-Control: no-cache' \
  --header 'Content-Type: application/json' \
  --header 'Postman-Token: 4427a0da-13e4-bcf5-96be-f088965791b7' \
  --data '{"mappings": {"items": {"properties": {"genres": {"type": "keyword","fields": {"raw": {"type": "keyword"}}}}}}}'
docker run -it --rm  -v $(pwd)/data:/data --net net -e MAX_NUMBER_TO_CRAWL=100 riws-crawler
