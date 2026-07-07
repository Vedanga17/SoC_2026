import dotenv from 'dotenv'; // need this to store our environment variables
dotenv.config();

import {DB_connector} from './db/connector.js'; // we wrote a function for connecting with db, importing it here.
import {app} from './app.js'; // importing express.js functionality over here

DB_connector() // handling in the form of a promise, using then and catch.
.then(() => { // if promise is resolved, just tell that the server is running and listening at the port
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => { // if promise is rejected, tell that the db connection failed.
    console.log("MongoDB connection failed!", err);
})