import express from 'express';
import cors from 'cors'; // will be needing this later
import cookieParser from 'cookie-parser'; // will be needing this later

const app = express(); // initialize object

// we use app.use to deal with middleware.
// middleware: work done after sending a request and before sending a response
app.use(express.json({
    limit: "16kb"
}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: true,
    credentials: true,
}));


// app.get('/health', (req, res) => { // get HTTP endpoint
//     res.send("Backend running successfully!");
// })
// app.post('/student', (req, res) => { // post HTTP endpoint
//     res.send("Student created successfully!")
// })


import { router } from './routes/student.routes.js';

app.use('/api/students', router);

export {app}; // export app to be used in index.js