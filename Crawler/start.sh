mkdir -p data
docker run -it --rm  -v $(pwd)/data:/data riws-crawler
