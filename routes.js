const fs = require("fs");

const requestHandler = (req, res) => {
  // console.log(req);

  // process.exit();

  // console.log(req.url, req.method, req.headers);

  // res.setHeader('Content-Type', 'text/html');
  // res.write('<html>');
  // res.write('<head><title>my node server</title></head>');
  // res.write('<body><h1>Hello from Node.js server</h1></body>');
  // res.write('<html>');
  // res.end();

  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>my node server</title></head>");
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"/><button>Send</button></form></body>'
    );
    res.write("<html>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);
      const message = parsedBody.split("=")[1];
      // // sync opration - blocking code
      // fs.writeFileSync('message.txt', message);
      // res.statusCode = 302;
      // res.setHeader('Location', '/');
      // return res.end();

      // // async operation - non-blocking code
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>my node server</title></head>");
  res.write("<body><h1>Hello from Node.js server</h1></body>");
  res.write("<html>");
  res.end();
};

// module.exports = requestHandler;

// module.exports = {
//     handler: requestHandler,
//     someText: 'Some text'
// };

// module.exports.handler = requestHandler;
// module.exports.someText = 'Some Text';

exports.handler = requestHandler;
exports.someText = 'Some Text';
