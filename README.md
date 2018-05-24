# Zeebe NodeJs Client

Use NodeJs with Zeebe.

## Prerequisites

1. NodeJS >= 8.11
1. Build Tools:

**On Linux:**

  - GCC
  - make
  - python 2.7

By default, all of these will be installed on most of the linux system.

**On Windows:**

  - Visual C++ build Tools
  - python 2.7

You can install all of these using:

`npm install --global --production --add-python-to-path windows-build-tools`.

To know more about this tool visit [this link](https://github.com/felixrieseberg/windows-build-tools).

💡 [Windows Vista / 7 only] requires .NET Framework 4.5.1

**On macOS:**

  - xcode & xcode commandline Tools,
  - python 2.7

By default, python is installed on macOS.
Install xcode from App app store.

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
...


## Features

Currently following features are implemented:

### Create Topic

```js
var myClient = new Client({bootstrapAddr: "0.0.0.0:51015"});
// Create a topic with topicName, partitionCount, replicationFactor
myClient.createTopic("my-topic", 1, 1);
```

### Create Workflow
```js
var myClient = new Client({bootstrapAddr: "0.0.0.0:51015"});
// Create a Workflow for given BPMN Process
myClient.createWorkflow("my-topic", "myProcess.bpmn");
```

### Create Workflow Instance

```js
var myClient = new Client({bootstrapAddr: "0.0.0.0:51015"});
// Create a Workflow Instance for the BPMN Process 'myProcess' using the latest version (-1) and passing empty payload.
myClient.createWorkflowInstance("my-topic", "myProcess", -1, {});
```

### Create Job Worker

```js
var myClient = new Client({bootstrapAddr: "0.0.0.0:51015"});
```

### Complete Job

```js
var myClient = new Client({bootstrapAddr: "0.0.0.0:51015"});
// Complete Job with given Job Key and passing empty payload.
myClient.completeJob(jobKey, {});
```

### Fail Job

```js
var myClient = new Client({bootstrapAddr: "0.0.0.0:51015"});
// Fail Job with given Job Key.
myClient.failJob(jobKey);
```
