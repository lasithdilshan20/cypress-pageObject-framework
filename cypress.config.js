const { defineConfig } = require('cypress');
const cypressReplay = require("@replayio/cypress");

module.exports = defineConfig({
  retries: 1,
  video: false,
  viewportWidth: 1280,
  viewportHeight: 720,
  defaultCommandTimeout: 60000,
  requestTimeout: 60000,
  responseTimeout: 60000,
  watchForFileChanges: false,
  waitForAnimations: true,
  animationDistanceThreshold: 5,
  failOnSnapshotDiff: true,
  experimentalStudio: false,
  modifyObstructiveCode: false,
  experimentalSourceRewriting: false,
  followRedirect: false,
  chromeWebSecurity: false,
  screenshotOnRunFailure: false,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      cypressReplay.default(on, config);
      return config;
    },
    baseUrl: 'https://www.gelato.com/en-US/',
  },
})
