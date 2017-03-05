WDIO Datadog reporter
=====================

> A [WebdriverIO](http://webdriver.io) plugin to report test run failures to [Datadog](www.datadoghq.com).

Installation
------------

The easiest way is to list `'@iflix/wdio-datadog-reporter'`
as dependency in your `package.json`.

```json
{
  "dependencies": {
    "@iflix/wdio-datadog-reporter": "~0.0.x"
  }
}
```

You can do it with `npm`:

```bash
npm install @iflix/wdio-datadog-reporter --save
```

or `yarn`

```bash
yarn add @iflix/wdio-datadog-reporter
```

Configuration
-------------

Following example shows typical [WebdriverIO](http://webdriver.io)
`'wdio.conf.js'` test runner configuration.

You have to import `'@iflix/wdio-datadog-reporter'` package
into variable and list it in `'reporters:'` section.

Using reporter name string (`'datadog'`) will not work,
as WebdriverIO doesn't do plugin discovery in scoped packages.

```js
// wdio.conf.js
import datadogReporter from '@iflix/wdio-datadog-reporter'

module.exports = {
  // ...
  reporters: ['spec', datadogReporter],
  reporterOptions: {
    datadog: {
      apiKey: '...', // Datadog API key,
      appKey: '...', // Datadog Application key
      eventTitle: '...', // Datadog event name
      devices: ['ios', 'chrome'], // using to mark as tags in datadog
    }
  }
  // ...
};
```

You can check your [Datadog account settings](https://app.datadoghq.com/account/settings#api)
in order to find right API and Application key for your reporting.
An event title shold correspond to event name you're looking for in a Datadog Monitor.

----

More information about WebdriverIO framework can be found here:  [http://webdriver.io](http://webdriver.io).
