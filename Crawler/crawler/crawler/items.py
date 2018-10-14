# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class CrawlerItem(scrapy.Item):
    # define the fields for your item here like:
    idGift = scrapy.Field()
    idGame = scrapy.Field()
    name = scrapy.Field()
    requiredPoints = scrapy.Field()
    entryNumber = scrapy.Field()
    remainingTime = scrapy.Field()
    numberOfCopies = scrapy.Field()
    level = scrapy.Field()
    genres = scrapy.Field()
    _created = scrapy.Field()
