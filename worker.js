const Client = require('./clientlib');

var myClient = new Client();

myClient.connect("192.168.21.18:51015");

myClient.job_worker("default-topic", "foo", {}, function(job) {
    //job.Event.Payload = {"hello": "world"}
    myClient.complete(job);
});
