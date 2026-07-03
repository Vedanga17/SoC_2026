import dotenv from 'dotenv';
dotenv.config();

import DB_connector from './db/connector.js';

DB_connector()
.then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MongoDB connection failed!", err);
})