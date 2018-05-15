const Client = require('./clientlib');

var myClient = new Client();

myClient.connect("127.0.0.1:51015");


myClient.job_worker("default-topic", "foo", options, function(job) {
    job.payload = {"hello": "world"}
    myClient.complete(job);
});
