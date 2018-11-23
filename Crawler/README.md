# Crawler

The crawler is based on scrapy which runs on top of python, the whole process is encapsulated on a docker container.

First build the image with

```
./build.sh
```

Then run the image using

```
./start.sh
```

Currently the container installs scrapy dependencies using pip and a requirements.txt file, after that it runs the program which is an spider to get the first titles in steamgifts, the output will appear in a data folder, to rerun the code delete the generated file inside.
