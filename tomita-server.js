// Load the http module to create an http server.
var http = require('http');
var url = require('url');
var exec = require('child_process').exec;

function think(primer, callback){
    exec('th sample.lua cv/tomita-deep.t7 -length 100 -primetext "'+primer+'" -temperature '+(1-(Math.random()*0.5))+' -seed '+Math.random()*10000+' -gpuid -1 ', function(error, stdout, stderr){ callback(stdout); });
};


// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  var url_parts = url.parse(request.url, true);
  var query = url_parts.query;
  if (query.lastline) {
    // console.log(query.lastline);
    think(query.lastline,function(thought){
        // response.writeHead(200, {"Content-Type": "text/plain"});
        response.writeHead(200, {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
        });
        
        var nextLines = thought.split("\n");
        console.log(thought);
        // console.log("------");
        if (nextLines[1] === "" || nextLines[1] === undefined) {
          console.log("😒 :Tomita Dumb");
          response.end("move "+Math.floor(Math.random()*500)+", "+Math.floor(Math.random()*500));
        } else {
          console.log("💭 Thinking...");
          console.log(nextLines[1].trim()+"\n"+nextLines[2].trim()+"\n"+nextLines[3].trim());
          response.end(nextLines[1].trim()+"\n"+nextLines[2].trim()+"\n"+nextLines[3].trim());
        }
      });
  }

  
});


server.listen(1337);
console.log("🙇 Tomita is thinking at http://127.0.0.1:1337/");