# -*- coding: utf-8 -*-
import scrapy
import time
from crawler.items import CrawlerItem
from scrapy.spiders import CrawlSpider, Rule, Request
from scrapy.linkextractors import LinkExtractor
from scrapy.exceptions import CloseSpider
import re
import json
import os


def customInt(string):
    return int(string.replace(",", ""))


class SteamgiftsSpider(CrawlSpider):
    name = "steamgifts"
    start_urls = ["https://www.steamgifts.com/"]
    count = 0

    rules = {
        Rule(LinkExtractor(allow=(), restrict_xpaths=(
            "//div[@class='pagination__navigation']/a/span[text() = 'Next']/.."))),
        Rule(LinkExtractor(allow=(), restrict_xpaths=(
            "//a[@class='giveaway__heading__name']")), callback='parse_item', follow=False)
    }

    def __init__(self, *args, **kwargs):
        super(SteamgiftsSpider, self).__init__(*args, **kwargs)
        maxItems = os.environ.get('MAX_NUMBER_TO_CRAWL')
        if (maxItems==None):
            maxItems=20
        else:
            maxItems = int(maxItems)
        self.maxItems = maxItems    

    def parse_item(self, response):
        item = CrawlerItem()
        item['name'] = response.xpath(
            "//div[@class='featured__heading__medium']/text()").extract_first()
        item['requiredPoints'] = self.getPoints(response)
        item['numberOfCopies'] = self.getCopies(response)
        baseUrl = "https://www.steamgifts.com/giveaway/"
        item['idGift'] = response.request.url.replace(
            baseUrl, "").split("/")[0]
        item['level'] = self.getLevel(response)
        item['entryNumber'] = customInt(response.xpath(
            "//div[@class='sidebar__navigation__item__count live__entry-count']/text()").extract_first())
        item['_created'] = time.time()
        baseSteamUrl = "https:\/\/store\.steampowered\.com\/\w*\/"
        item['idGame'] = customInt(re.sub(baseSteamUrl, "", response.xpath(
            "//div[@class='featured__heading']/a[1]/@href").extract_first()).split("/")[0])
        item['remainingTime'] = customInt(response.xpath(
            "//div[@class='featured__column']/span/@data-timestamp").extract_first())
        item['url'] = response.request.url
        url = "https://store.steampowered.com/api/appdetails?appids=" + \
            str(item['idGame'])
        self.count += 1
        if (self.count > self.maxItems):
            raise CloseSpider('item_exceeded')
        yield Request(url, meta={'item': item}, callback=self.parseSteamApi, dont_filter=True)

    def getPoints(self, response):
        pointsString = response.xpath(
            "//div[@class='featured__heading']/div[@class='featured__heading__small'][contains(text(),'P)')]/text()").extract_first()
        return customInt(pointsString.replace("(", "").replace("P)", ""))

    def getCopies(self, response):
        copies = response.xpath(
            "//div[@class='featured__heading']/div[@class='featured__heading__small'][contains(text(),'Copies')]/text()").extract_first()
        if copies:
            return customInt(copies.replace("(", "").replace(" Copies)", ""))
        else:
            return 1

    def getLevel(self, response):
        level = response.xpath(
            "//div[@title='Contributor Level']/text()").extract_first()
        if level:
            return customInt(level.replace("Level ", "").replace("+", ""))
        else:
            return 0

    def parseSteamApi(self, response):
        item = response.request.meta['item']
        jsonresponse = json.loads(response.body_as_unicode())
        data = jsonresponse[str(item['idGame'])]['data']
        item['name'] = data['name']
        genres = data['genres']
        item['genres'] = list(map(lambda x: x['description'], genres))
        yield item
