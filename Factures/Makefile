step1: 
	rm -rf data/*
	npm install
	npm run build
	mongod --dbpath data

step2:
	mongoimport --db dbfactures --collection ressources --type csv --file ./public/csv/prices.csv --headerline
	npm run start

clean:
	rm -rf public/dist 
	rm -rf node_modules
	rm -rf data/*
