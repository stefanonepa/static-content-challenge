const express = require('express');
const path = require('path');
const parseMdToHtml = require('./middlewares/parseMdToHtml');

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views'));

function createServer(contentRoot = '../content') {
    app.get(
        '*',
        parseMdToHtml(contentRoot),
        function renderTemplate({ content }, res) {
            res.render('template', { content });
        }
    );

    // basic error handler
    app.use(function (err, req, res, next) {
        res.status(404).render('404');
    });

    const port = process.env.PORT || 3000;
    const server = app.listen(port);
    console.log(`Express started on ${port}`);
    return server;
}

module.exports = createServer;
