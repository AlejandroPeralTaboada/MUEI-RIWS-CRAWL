# MUEI-RIWS-CRAWL

## Description

This is a project to crawl steamgifts.com , create an Elasticsearch index with the data and present the results in an Angular client

## Disclaimer

This is a test project for learning purpouses, the configuration provided is not intended to run on a live enviroment.

There are no https configuration files, neither elastic has a secure user configuration. 


## Deploy

This project is divided in 3 parts, acording to the folder structure, Elastic, Crawler and Client

In order to launch this project you can follow the following instructions

Download git repository:

	git clone https://github.com/AlejandroPeralTaboada/MUEI-RIWS-CRAWL

Install Docker (if needed):
  Windows:

	https://store.docker.com/editions/community/docker-ce-desktop-windows

  Ubuntu:

	curl -fsSL https://get.docker.com -o get-docker.sh
	sudo sh get-docker.sh
	sudo usermod -aG docker $(whoami)	

Remember to log out and log in again, otherwise this wouldn't have any effect


Run Elastic (inside Elastic's folder):

	sh ./run.sh	

It may take a while to download... be patient


Now Elastic is up... it's time to start crawling!

You can check Elastic in:

    http://localhost:9200 
 
and run ./test.sh to create a mock index

The index is created in 
    
    http://localhost:9200/test 
and contains 1 doc.



Run Crawler (inside Crawler's folder):

	sudo sh ./build.sh 
It may take a while to download as well... be patient (again)

	./start.sh			
It starts crawling. There is a 'MAX_NUMBER_TO_CRAWL' attribute that can be modified to specify number of steamgifts that will be crawled (default is 100)

After starting the crawler we recommend to run 'docker ps' to make shure that there aren't any running processes 

    docker ps -a -> lists all docker images

Now you can go to http://localhost:9200/steamgifts and check that everything is OK.
We recommend to use Postman for an easy interaction with the index.

Now to the client part.
Go to the Client folder:

	docker build -t angular-riws
	docker run -p 80:80 angular-riws