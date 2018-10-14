# -*- coding: utf-8 -*-
import scrapy
from crawler.items import CrawlerItem
from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor
from scrapy.exceptions import CloseSpider

class SteamgiftsSpider(CrawlSpider):
    name = "steamgifts"
    start_urls = ["https://www.steamgifts.com/"]
    count = 0

    rules = {
        Rule(LinkExtractor(allow = (),restrict_xpaths = ("//div[@class='pagination__navigation']/a/span[text() = 'Next']/.."))),
        Rule(LinkExtractor(allow = (),restrict_xpaths = ("//a[@class='giveaway__heading__name']")),callback='parse_item',follow=False)
    }    

    def parse_item(self, response):
        item = CrawlerItem()
        item['name'] = response.xpath("//div[@class='featured__heading__medium']/text()").extract_first()
        item['requiredPoints'] = self.getPoints(response)
        # idGift = scrapy.Field()
        # idGame = scrapy.Field()
        # requiredPoints= scrapy.Field()
        # entryNumber= scrapy.Field()	
        # remainingTime = scrapy.Field()
        # numberOfCopies=scrapy.Field()
        # level = scrapy.Field()
        # genres = scrapy.Field()	
        # _creaeted = scrapy.Field()
        self.count +=1
        if (self.count>1):
            raise CloseSpider('item_exceeded')
        yield item

    def getPoints(self,response):
        pointsString=response.xpath("//div[@class='featured__heading']/div[@class='featured__heading__small'][contains(text(),'P)')]/text()").extract_first()
        return pointsString.replace("(", "").replace("P)", "")

    def getCopies(response):
        copies=response.xpath("//div[@class='featured__heading']/div[@class='featured__heading__small'][contains(text(),'Copies')]/text()").extract_first()    
        if copies:
            return copies.replace("(", "").replace(" Copies)", "")
        else:
            return 1