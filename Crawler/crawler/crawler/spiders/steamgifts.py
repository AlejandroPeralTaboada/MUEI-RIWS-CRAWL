# -*- coding: utf-8 -*-
import scrapy
import time
from crawler.items import CrawlerItem
from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor
from scrapy.exceptions import CloseSpider


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
        baseSteamUrl = "https://store.steampowered.com/app/"
        item['idGame'] = customInt(response.xpath(
            "//div[@class='featured__heading']/a[1]/@href").extract_first().replace(baseSteamUrl, "").split("/")[0])
        item['remainingTime'] = customInt(response.xpath(
            "//div[@class='featured__column']/span/@data-timestamp").extract_first())
        # genres = scrapy.Field()
        # https://store.steampowered.com/api/appdetails?appids=646470
        self.count += 1
        if (self.count > 20):
            raise CloseSpider('item_exceeded')
        yield item

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
