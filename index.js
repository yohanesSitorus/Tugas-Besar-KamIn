import express from 'express';
import path from 'path';
// import session from 'cookie-session';
// import crypto from 'crypto';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser());
const port = 8010;
const publicPath = path.resolve('static-path');

app.use(express.static(publicPath));
app.set('view engine', 'ejs');

import bodyParser from 'body-parser';
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log('App started');
    console.log(`Server running on http://localhost:${port}`);
});

// import mysql from 'mysql';
// // MySQL Connection
// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'kamin',
//     "typeCast": function castField(field, useDefaultTypeCasting) {
//         if ((field.type === "BIT") && (field.length === 1)) {
//             var bytes = field.buffer();
//             return (bytes[0]);
//         }
//         return (useDefaultTypeCasting());
//     }
// });

app.get('/', async (req, res) => {
    res.redirect('/home');
    // res.render('layout')
})

app.get('/home', async (req, res) => {
    res.render('home');
    // res.render('layout')
})