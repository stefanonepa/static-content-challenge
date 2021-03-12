const express = require('express');
const fs = require('fs');
const marked = require('marked');
const path = require('path');

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views'));

function createServer(contentRoot = '../content') {
    function parseMdToHtml(req, res, next) {
        const urlPath = req.path;
        try {
            fs.readFile(
                path.join(__dirname, `${contentRoot}${urlPath}/index.md`),
                'utf8',
                function (err, str) {
                    if (err) return next(err);

                    const html = marked.parse(str);
                    req.content = html;
                    next();
                }
            );
        } catch (error) {
            next(error);
        }
    }

    app.get('*', parseMdToHtml, function renderTemplate({ content }, res) {
        res.render('template', { content });
    });

    // error handler
    app.use(function (err, req, res, next) {
        res.status(404).render('404');
    });

    const server = app.listen(3000);
    console.log('Express started on port 3000');
    return server;
}

module.exports = createServer;
