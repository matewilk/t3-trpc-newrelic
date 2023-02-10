import "@types/newrelic";

interface Collector {
  isConnected(): boolean;
}

interface Agent {
  on(event: string, callback: (arg: any) => void): void;
  collector: Collector;
}

declare module "newrelic" {
  export const agent: Agent;
}
