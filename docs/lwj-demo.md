# Learn With Jason Demo

### How this demo was created

This demo was created using [`create-t3-app`](https://create.t3.gg/) with the followng options:

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [tRPC](https://trpc.io)
- [Tailwind CSS](https://tailwindcss.com)
- ~~[NextAuth.js](https://next-auth.js.org)~~
- ~~[Prisma](https://prisma.io)~~

It uses the recommended [T3 Stack](https://create.t3.gg/) setup.

### What are the objectives of the demo
- Show how to integrate New Relic Browser agent with Next.js
- Show how to integrate New Relic Node.js agent with Next.js
- Learn what New Relic can do for you
- Learn how to correlate Logs, Traces, and Browser data in New Relic to achieve full observability of your application

### A peak at what you will see in New Relic UI and what are we aiming for
- show APM service map - the best way to visualize the relationships between services in our case relationships the client, server and third party services.

### A brief introduction to MELT
- MELT stands for Metrics, Events, Logs, Traces and is a set of metrics that can be used to measure the performance of your application.
  - Metric - a numeric measurement of an application or system. Typically reported on a regular schedule.
    - example: a count of events over a period of time or a rate of some event per minute
    - example: a numeric status at a moment in time, such as the number of active users or the number of errors
  - Event - a record of something that happened in your application. Events are typically reported when something happens. Events typically have a shape of a key value pair.
    - example: a user clicks a button, a file is uploaded.
    - example: vending machine dispenses a soda
  - Log - is a message about a system used to understand the activity of the system and to diagnose problems.
  - Trace - is a record of the path a request takes through your system. Traces are   typically reported when a request is received and when it is completed. It often refers to distributed tracing which is a way to monitor requests as they propagate through a distributed system.


### How to start

1. clone the repo
2. run `npm install`
3. copy New Relic License Ingest Key to `newrelic.cjs`
4. renamme `example.env` to `.env`
5. run `npm run dev`
6. navigate to `http://localhost:3000`

### App setup

The app has the following pages:
- `/` - home page
- `/blog` - blog page with a list of posts
- `/posts/:id` - post page with post details
- `/about` - about page

T3 Stack tRPC [ssr value](/src/utils/api.ts#L53) is left at default `false` so `http` calls happen on the client side. 

### New Relic Browser Agent

### A peak at what you will see in the New Relic UI after instrumenting the Browser agent
- Browser agent summary view for the application
- mention a few other things that can be seen in the UI with certain use cases
  - if you want to know which pages perform the worst/best
  - if you want to know web vitals for your app or a specific page or a specific browser
  - if you want to know what are the most popular browsers for your app
  - if you want to know total time spent on ajax requests

#### Instrumentation

The Browser agent is instrumented via the `newrelic` npm package (New Relic node agent). 
In the `_document.tsx` file we import the `newrelic` package and call its `getBrowserTimingHeader` function to get the script for the Browser agent.

```tsx
  const browserTimingHeader = newrelic.getBrowserTimingHeader({
    hasToRemoveScriptWrapper: true,
  });
```

The `hasToRemoveScriptWrapper` option is set to `true` because we don't want the script to be wrapped in a `<script>` tag.

Next we add the script to the `head` of the document:

```tsx
  <Head>
    <script
      type="text/javascript"
      dangerouslySetInnerHTML={{ __html: this.props.browserTimingHeader }}
    />
  </Head>
```

The browser agent can also be instrumented using a copy->paste method. You can find the script in the New Relic UI should you be interested in that method.

Let's take a sneak peak at what the script looks like in the page source.
We can also see in the developer tools `network` tab that the script is loaded from `js-agent.newrelic.com` and executed.

#### Main focus and functions of the agent
- End-To-End Visibility - full stack visibility - identifies bottlenecks and performance issues from back-end to front-end including end-user experience.
- Improve User Experience - user centric perceived performance for modern web applications.
  - Core Web Vitals
    -  First Contentful Paint (FCP) - time to first meaningful paint
    - First Input Delay (FID) - time to first user interaction
    - Cumulative Layout Shift (CLS) - visual stability
- Debugging and Error Tracking - Prioritize and fix issues faster with real-time error tracking and debugging.
  - Error Inbox
  - JS Stack Traces
- Drive Business Value - measure and optimize performance to improve business outcomes.

##### In addition to the above, the agent also provides (optional):
- Page Views - page views and page load times
  - SPA page - route changes
  - Standard - Initial page load
- Ajax Requests (XHR/Fetch)
  - sorted by various parameters
    - total time percentange
    - response time
    - average callback time
- Session Traces
  - page load timing
  - individual asset loads
  - user interactions
  - AJAX requests
  - Callbacks
  - Errors and other events during the session
- Browsers
  - metrics split by browser
- Geography
  - metrics split by country

### New Relic Node.js Agent

### A peak at what you will see in the New Relic UI after instrumenting the Node.js agent
- Node.js agent summary view for the application
  - focuses around the performacne of your backend services
  - answers questions as to how your service performs relative to user expectations
  - what is the average transaction time and whether it is within the acceptable range and are there any outliers
  - how many requests are being made to your service and what percentage of them are successful/failed
  - are there any logs or errors associated with your service (we will cover logs later in this demo)

#### Instrumentation

The Node.js agent is instrumented via the `newrelic` npm package and `@newrelic/next` npm package.
`@newrelic/next` is New Relic's official Next.js plugin that automatically instruments Next.js applications.

Typically you would instrument `@newrelic/next` via your `package.json` `scripts` section by running the package with `-r` option like this:

```json
  "scripts": {
    "dev": "NODE_OPTIONS='-r @newrelic/next' next dev",
    "start": "NODE_OPTIONS='-r @newrelic/next' next start"
  }
```

It can be also instrumented with a custom `Next.js` server by runnin your server script with `-r` option like this:

```json
  node -r @newrelic/next server.js
```

#### Main focus and functions of the agent (optional)
- Performance Monitoring
  - Identify and resolve performance issues
  - Identify and resolve errors
  - Identify and resolve bottlenecks
- Visualize where your app is spending its time
- Identify slow requests
- Group metrics
- (database profiling not in this demo)
- Logging
  - Contextualize logs and transactions data
  - (more on that later)

### Common for both agents (Browser and Node.js)
- Distributed Tracing
  - New Relic traces data across the entire stack
    - from time spent by an end user on a page
    - through network activity
    - to associated backend services
    - including database queries (not in this demo)
- Service Map
  - visualizes the relationships between services
- Dependencies
  - show the dependencies between services

### Generating errors in the app

#### Front-end error

In [/pages/posts/[id].tsx](/src/pages/posts/[id].tsx) on line 34:

```tsx
  {/* // Simulate a 10% chance of a browser error */}
  {Math.random() <= 0.1 ? data!.id : data?.id}
```

Go to `http://localhost:3000/blog` and click on any post. You should see an error pop up in the browser. (with a 10% chance)

Go to the New Relic Browser Agent and click on `JS Errors` in the left side menu. You should see a view with a list of error instances. Click on the first one and you should see the overview of the error.

Click on `Error Instances` tab and you should see:
- Event Log
- Js Stack Trace
  - (in prod envs you would see the source map here - needs to be [uploaded via API](https://docs.newrelic.com/docs/browser/new-relic-browser/browser-pro-features/upload-source-maps-api/))


Remove the error and refresh the page. You should see the post details.

#### Return 400 from the getPostById http call (transaction error)

In [/pages/posts/[id].tsx](/src/pages/posts/[id].tsx) on line 67 we simulate a 5% chance of a post `id` not existing:

```tsx
  // Simulate a 5% chance of a post not existing
  if (Math.random() <= 0.05) {
    return new Promise((resolve) =>
      resolve({ props: { id: null as unknown as string } })
    );
  }
```

This will cause the JsonPlaceholder API (called in the client) to return 400 error.

#### tRPC procedure error (transaction error)

In [/server/api/routers/posts.ts](/src/server/api/routers/posts.ts) on line 20 we simulate a 5% chance of throwing an error from `getPostById` procedure:

```ts
  // Simulate random error
  if (Math.random() <= 0.05) throw new Error("Random getPostById error");
```

Equally in the same file in `getAllPosts` procedure on line 34 we simulate a 5% chance of throwing an error:

```ts
  // Simulate random error
  if (Math.random() <= 0.05) throw new Error("Random getAllPosts error");
```

### Logs in context

[New Relic Logs in context](https://docs.newrelic.com/docs/logs/logs-context/logs-in-context/) feature allows you to see the logs associated with other metrics collected by the agent.
- APM data
- Error data
- Infrastructure data (not in this demo)

With that contextual kowledge you can dig deeper into the pefromance of your app without having to manually search through logs.

Benefits of using New Relic
  - No need to setup log endpoints or collectors
  - No need to set up log files and log rotation
  - No need to parse logs

New Relic node agent comes with support for `pino` and `winston` logging libraries out of the box.

#### Pino

Pino is a super fast Node.js logger. It is a JSON logger with a very low overhead.
It comes with great [API](https://getpino.io/#/docs/api) and useful features like [redaction](https://getpino.io/#/docs/redaction) and [pretty printing](https://getpino.io/#/docs/pretty) (for development).

Install `pino` npm package:

```bash
npm i pino
```

Create a logger file in `src/utils/logger.ts`:

```ts
import pino from "pino";

export const logger = pino({});
```

Go to [/pages/posts/[id].tsx](/src/pages/posts/[id].tsx) 

At the top of the file import the logger:

```tsx
import { logger } from "../../utils/logger";
```

on lin 73 add:

```tsx
  logger.info(`getServerSideProps: PostId - ${id}`);
```

We can also add `logger.error` in our error simulating condition like so:

```ts
  logger.error("Post not found");
```

Pino allows passing custom properties to the log message. We can add `postId` property to the log message like so:

```ts
  logger.error({ postId: id }, "Post not found");
```

Let's grap the error handled in the `createNextApiHander` by the `tRPC` router and send it to New Relic.

In [/pages/api/trpc/[trpc].ts](/src/pages/api/trpc/[trpc].ts) in the `onError` handler add:

```ts
  logger.error(error, "tRPC error");
```

Let's see what we get in the New Relic UI and how it is correlated with the other data.

### Alerting

New Relic Alerts allows you to set up alerts for your application and infrastructure data on virtually any metric you can imagine. You can set up an alert to notify you when a metric crosses a threshold you define.

We'll go through the steps described in the [New Relic Alerts documentation](https://docs.newrelic.com/docs/alerts-applied-intelligence/new-relic-alerts/get-started/your-first-nrql-condition/). Just the basics, without diving into the details like fine tuning advanced signals.