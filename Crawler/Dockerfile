FROM python:3.6

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY crawler ./crawler
WORKDIR /usr/src/app/crawler

VOLUME /data

CMD [ "scrapy", "crawl" ,"steamgifts" ,"-o", "/data/data.json" ]
