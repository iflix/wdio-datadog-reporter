import events from 'events'
import dogapi from 'dogapi'

/**
 * Initialize a new `Datadog` test reporter.
 */
class DatadogReporter extends events.EventEmitter {
  constructor (baseReporter, wdioConf = {}, reporterOptions = {}) {
    super()

    this.baseReporter = baseReporter
    this.config = wdioConf
    this.options = reporterOptions

    this.on('runner:end', (res) => {
      let errors = ''
      for (const runnerId in this.baseReporter.stats.runners) {
        const runnerInfo = this.baseReporter.stats.runners[runnerId]
        for (const specId in runnerInfo.specs) {
          const spec = runnerInfo.specs[specId]
          for (let suiteName in spec.suites) {
            const suite = spec.suites[suiteName]
            for (const testName in suite.tests) {
              const test = suite.tests[testName]
              if (test.error) {
                let error = `
                  Platform: ${runnerInfo.capabilities.browserName || runnerInfo.capabilities.platformName}\n
                  Test: ${testName}\n
                  Message: ${test.error.message}
                `

                if (this.config.services.indexOf('sauce') !== -1) {
                  error = `${error}\nSauceLab report: https://saucelabs.com/tests/${runnerInfo.sessionID}`
                }

                errors = `${errors}\n${error}`
              }
            }
          }
        }
      }
      this.triggerDataDogEvent(errors)
    })

    this.triggerDataDogEvent = (errors) => {
      if (typeof this.options.apiKey !== 'string') {
        return console.log(`Cannot trigger datadog: empty or invalid 'apiKey'.`)
      }

      if (typeof this.options.appKey !== 'string') {
        return console.log(`Cannot trigger datadog: empty or invalid 'appKey'.`)
      }

      if (typeof this.options.eventTitle !== 'string') {
        return console.log(`Cannot trigger datadog: empty or invalid 'eventTitle'.`)
      }

      if (errors.length === 0) {
        return
      }

      const params = {
        api_key: this.options.apiKey,
        app_key: this.options.appKey
      }

      dogapi.initialize(params)
      let title = this.options.eventTitle
      let text = `%%% ${errors}`
      let properties = {
        tags: this.options.devices || [],
        alert_type: 'error'
      }

      return new Promise((resolve, reject) => {
        dogapi.event.create(title, text, properties, () => {
          console.log('Datadog was triggered with tests error details.')
          resolve('done')
        })
      })
    }
  }
}

DatadogReporter.reporterName = 'datadog'

export default DatadogReporter
