# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class CrawlerItem(scrapy.Item):
    # define the fields for your item here like:
    name = scrapy.Field()
    cost = scrapy.Field()
    created = scrapy.Field()
    crawled = scrapy.Field()
    steamId = scrapy.Field()
    entries = scrapy.Field()
    imageLink = scrapy.Field()
    pass
