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

import mysql from 'mysql';
// MySQL Connection
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'kamin',
    "typeCast": function castField(field, useDefaultTypeCasting) {
        if ((field.type === "BIT") && (field.length === 1)) {
            var bytes = field.buffer();
            return (bytes[0]);
        }
        return (useDefaultTypeCasting());
    }
});


app.get('/login', async (req, res) => {
    res.render('login', { errorMsg: null, success: null });
})

app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const accountQuery =
        'SELECT `E_mail`, `Password` FROM `account` WHERE `E_mail` = ? AND `Password` = ?';
    // 'SELECT `Id_Account`,`E_mail`, `Password` FROM `account` WHERE `E_mail` = ? AND `Password` = ?';
    const accountParams = [email, password];

    pool.query(accountQuery, accountParams, (error, results) => {
        if (error) {
            console.log(error);
        } else if (results.length > 0) {
            // const user = results[0];
            // res.cookie('Id_Account', user.Id_Account)
            // res.cookie('email', user.E_mail);
            // res.cookie('role', user.);

            // if (user.Account_Role === 'admin') {
            //     res.redirect('/admin-menu');
            // }
            // else if (user.Account_Role === 'dosen') {
            //     res.redirect('/menu-dosen')
            // }
            // else {
            //     res.redirect('/');
            // }
            // res.render('/home');
            console.log("Successfully validated");
            res.redirect('/home');
        } else {
            res.render('login', {
                errorMsg: 'Password / email anda salah.',
                success: false,
            });
        }
    });
});

app.get('/', async (req, res) => {
    res.redirect('/home');
    
})

app.get('/home', async (req, res) => {
    res.render('home');
    
})

app.get('/AddVote', async (req, res) => {
    res.render('AddVote');
    
})