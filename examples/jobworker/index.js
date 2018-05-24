const { Client } = require("zbc-nodejs");

var myClient = new Client({bootstrapAddr: "0.0.0.0:51015"});
console.log("starting client")

myClient.createTopic("hello-world");

if (success) {
  myClient.job_worker("default-topic", "foo", {}, function(job) {
    myClient.complete(job);
  });
} else {
  console.log("error");
}
