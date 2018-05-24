# Zeebe NodeJs Client

Use NodeJs with Zeebe.

## Prerequisites

1. NodeJS >= 8.11
1. Build Tools?

## Installing

```js
npm install -s zbc-nodejs
```

Or

```js
yarn add zbc-nodejs
```

## Get Started
1. Make sure you have the Zeebe Broker running.
2. Create a simple process model.



## Features

Currently following features are implemented:

### Create Topic

```js
var myClient = new Client();
myClient.connect({bootstrapAddr: "0.0.0.0:51015"});
myClient.createTopic("my-topic");
```

### Create Workflow
```js
var myClient = new Client();
myClient.connect({bootstrapAddr: "0.0.0.0:51015"});
myClient.createWorkflow("my-topic", "myProcess.bpmn");
```

### Create Workflow Instance

```js
var myClient = new Client();
myClient.connect({bootstrapAddr: "0.0.0.0:51015"});
// Create a Workflow Instance for the BPMN Process 'myProcess' using the latest version (-1) and passing no payload.
myClient.createWorkflowInstance("my-topic", "myProcess", -1, {});
```

### Create Job Worker

```js
var myClient = new Client();
```

### Complete Job

```js
var myClient = new Client();
```

### Fail Job

```js
var myClient = new Client();
```
