const path = require('path');
const fs = require('fs');
const marked = require('marked');

const parseMdToHtml = (contentRoot) => (req, res, next) => {
    const urlPath = sanitize(req.path);
    try {
        fs.readFile(
            path.join(__dirname, `../${contentRoot}${urlPath}/index.md`),
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
};

function sanitize(path) {
    // TODO: imrpove sanitization
    return path.replace(/\.\.\//g, '');
}

module.exports = parseMdToHtml;
