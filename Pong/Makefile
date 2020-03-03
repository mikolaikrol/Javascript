all : install start

install :
	npm install

start : 
	npm run build
	npm start

launch :
	firefox 127.0.0.1:3000 &

clean :
	rm -rf public/dist 
	rm -rf node_modules