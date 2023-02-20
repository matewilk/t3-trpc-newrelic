import type newrelic from "newrelic";

interface Newrelic extends newrelic {
  noticeError(
    error: (Error & { statusCode?: number | undefined }) | null | undefined
  ): void;
  addPageAction: (actionName: string, customAttributes?: object) => void;
  setCustomAttribute: (key: string, value: string | number) => void;
}

// for the New Relic browser agent
declare global {
  interface Window {
    newrelic: Newrelic;
  }
}
