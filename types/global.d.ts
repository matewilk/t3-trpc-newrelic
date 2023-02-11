import type newrelic from "newrelic";

// for the New Relic browser agent
declare global {
  interface Window {
    newrelic: newrelic;
  }
}
