# MUEI-RIWS-CRAWL

## Crawler

The crawler is based on scrapy which runs on top of python, the whole process is encapsulated on a docker container.

First build the image with

```
./build.sh
```

Then run the image using

```
./start.sh
```

Currently the container installs scrapy dependencies using pip and a requirements.txt file, after that it runs the program which is an example and only prints hello world
