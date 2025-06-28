Backend Documentation:
installed node packages:
	npm install express mongoose dotenv bcrypt jsonwebtoken cors axios

Dev + testing tools:
	npm install --save-dev nodemon jest supertest

1. Connecting the Mongo Db Databse:
	For testing I used MongoDB Compass, create a new connection, inside create a new database (I named it abmh, you can change it and with it change the .env file).
	Now create the .env file, its contents are (You can change it, PORT: is the port number that the server will run on, and MONGO_URI is self explanatory):
		PORT=5000
		MONGO_URI=mongodb://localhost:27017/abmh
		JWT_SECRET=superstrongsecret

	To test if the DB connects run the server using:
		npm run dev
	If the DB connects you should get a message in the command line saying that 'MongoDB is connected.'

2.Add a new admin user to the database using automated script "createAdminUser.js":
	Run using:
		node createAdminUser.js
	by default this script creates a user in the database with:
		email: admin@example.com
		password: adminpass

3.Test the login functionality with testLogin.js:
	node testLogin.js:
	Note: This checks for the default user as created by createAdminUser.js, if you change createAdminUser.js, change testLogin.js appropriately or to test it with a user 			that you added manually you can user CURL, postman or again change the inputs inside testLogin.js. 
