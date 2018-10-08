# -*- coding: utf-8 -*-
import scrapy
from crawler.items import CrawlerItem


class SteamgiftsSpider(scrapy.Spider):
    name = "steamgifts"
    start_urls = ["https://www.steamgifts.com/"]

    def parse(self, response):
        item = CrawlerItem()
        for quote in response.xpath("//div[@class='giveaway__row-inner-wrap']"):
            item["name"] = quote.xpath(".//div/h2/a/text()").extract_first()
            yield item
