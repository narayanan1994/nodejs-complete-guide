[<<-- back to main](../../README.md) - [<-- previous section](../section%204%20development%20workflow%20and%20debugging/section4-notes.md) - [next section -->](../../README.md)

# express.js
![Alt text](things-in-expressjs.png)

# middleware
![Alt text](express-middleware.png)

- exact matching of route only happens with app.get()/app.post(), not for app.use()

```
creating Express instance
const express = require('express');
const app = express();

concepts in Expressjs
    - middleware (we can funnel through multiple blocks) (req, res, next) => {}
Example:
step-1: request
step-2: middleware-1 next()
step-3: middleware-2 res.end()
step-4: response

res.send(<any-content>) -> here if we dont set the setHeader, default would be Content-Type: text/html
------------------------------------
IMPORTANT NOTE:
earlier we need separate body-parser package with proj
    const express = require('express');
    const bodyParser = require('body-parser');
    const app = express();
    app.use(bodyParser.urlencoded({ extended: true })) 
Since express 4.16.0, body-parser has been added to, so we can use the following code:
(also bodyParser npm pkg is not necessarily required)
    app.use(express.urlencoded({ extended: true }))

------------------------------------
IMPORTANT-PROBLEM
app.use(express.urlencoded({ extended: false }));
the response is
[Object: null prototype] { title: 'Book' }
then changed to
app.use(express.urlencoded({ extended: true }));
the response now is
{ title: 'Book' }
------------------------------------

IMPORTANT
for working with path
two globally available variables provided by Nodejs
    __dirName
    __fileName
and when using the path.join(__dirName, ....); here __dirName automaitcally picks projs root directory 
and when using to construct the path like path.join(__dirName, 'views', 'shop.html'); avoid using slash
because path internally detects the os that we run and concat slash accordingly
paths in windows general are '\' while in general for linux are '/'

------------------------------------
TO BRING PUBLIC FOLDER
here the public folder is always served static
app.use(express.static(path.join(__dirname, 'public')));
and example were we try to access any location files with .(dot),
it will automaitcally treat it as if we are looking into public folder 
for example: 
it doesn't need to be <link rel="stylesheet" href="/public/css/main.css" />
but this <link rel="stylesheet" href="/css/main.css" />
```
# module summary
![Alt text](module-summary.png)

[<<-- back to main](../../README.md) - [<-- previous section](../section%204%20development%20workflow%20and%20debugging/section4-notes.md) - [next section -->](../../README.md)
