

function globalMiddleware(req, res, next) {
    const today = new Date();
    console.log("Date: " + today.getDate() + ":" + today.getMonth() + ":" + today.getFullYear());
    console.log('Time of Request: ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds());
    console.log("Is secure: " + req.secure);
    console.log("Host Name: " + req.hostname);
    console.log("File Path: " + req.path);
    console.log("Method: " + req.method);
    console.log("----------------------------------------------------------")
    next();
}

module.exports = globalMiddleware;