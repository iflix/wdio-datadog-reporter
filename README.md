WDIO Datadog reporter
==========

> A WebdriverIO plugin to report into Datadog.

## Installation

The easiest way is to keep `@iflix/wdio-datadog-reporter` as a Dependency in your `package.json`.

```json
{
  "dependencies": {
    "@iflix/wdio-datadog-reporter": "~0.0.x"
  }
}
```

You can simple do it by:

```bash
npm install @iflix/wdio-datadog-reporter --save
```

Instructions on how to install `WebdriverIO` can be found [here](http://webdriver.io/guide/getstarted/install.html).

## Configuration

Following code shows the default wdio test runner configuration. Just add `'datadog'` as reporter to the array and configuration for that:

```js
// wdio.conf.js
module.exports = {
  // ...
  reporters: ['datadog'],
  reporterOptions: {
    datadog: {
      apiKey: '...', // datadog API KEY
      appKey: '...', // datadog APP KEY
      eventTitle: process.env.STAGEPLAY_DATADOG_EVENT_TITLE
      devices: ['ios', 'chrome'], // using to mark as tags in datadog
      testEnvironment: 'saucelabs', // local or undefined
    }
  }
  // ...
};
```

----

For more information on WebdriverIO see the [homepage](http://webdriver.io).