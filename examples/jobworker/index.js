const { Client } = require("zbc-nodejs");

var myClient = new Client();

var success = myClient.connect({bootstrapAddr: "127.0.0.1:51015"});

if (success) {
  myClient.job_worker("default-topic", "foo", {}, function(job) {
    myClient.complete(job);
  });
} else {
  console.log("error");
}
