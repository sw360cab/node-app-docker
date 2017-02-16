// Load the http module to create an http server.
var http = require('http');
var os = require('os');

var getPrivateIp = function() {
  var ifaces = os.networkInterfaces();
  var ip;
  Object.keys(ifaces).forEach(function (ifname) {
    ifaces[ifname].forEach(function (iface) {
      if (ip) return; // ip already found

      if ('IPv4' !== iface.family || iface.internal !== false) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return;
      }
      else if ('IPv4' === iface.family) {
        console.log(ifname, iface.address);
        ip = iface.address;
      }
    });
  });
  return ip
};

var server = http.createServer(function (request, response) {
  var hostname = os.hostname();
  var ip = getPrivateIp();

  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end(["Hello World from",hostname,"with ip:",ip,'\n'].join(' '));
});

server.listen(800);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:800/");
