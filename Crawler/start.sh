mkdir -p data
docker run -it --rm  -v $(pwd)/data:/data --net net riws-crawler
