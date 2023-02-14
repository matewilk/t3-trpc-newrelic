# Learn With Jason Demo

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

The browser agent can also be instrumented using a copy->paste method. You can find the script in the New Relic UI.

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

##### In addition to the above, the agent also provides:
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

#### Main focus and functions of the agent
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

### Browser Agent Demo

#### Let's create a front-end error

Go to [[id].tsx](/src/pages/posts/[id].tsx) and on line 18 add:

```tsx
  if (!data?.id) {
    throw new Error("Post not found");
  }
```

Go to `http://localhost:3000/blog` and click on any post. You should see an error pop up in the browser.

Go to the New Relic Browser Agent and click on `JS Errors` in the left side menu. You should see a view with a list of error instances. Click on the first one and you should see the overview of the error.

Click on `Error Instances` tab and you should see:
- Event Log
- Js Stack Trace
  - (in prod envs you would see the source map here - needs to be [uploaded via API](https://docs.newrelic.com/docs/browser/new-relic-browser/browser-pro-features/upload-source-maps-api/))


Remove the error and refresh the page. You should see the post details.

#### Let's return 400 from the getPostById http call

Go to [[id].tsx](/src/pages/posts/[id].tsx) and on line 64 remove the exclamations mark from the `if` statement:

```tsx
  if (id) {
    return new Promise((resolve) =>
      resolve({ props: { id: null as unknown as string } })
    );
  }
```

This will cause the JsonPlaceholder API to return 400 error.

#### Cause JS Error in the app (optional)

Go to [[id].tsx](/src/pages/posts/[id].tsx) and on line 64 replace:

```tsx
  if (id) {
    return new Promise((resolve) =>
      resolve({ props: { id: null as unknown as string } })
    );
  }
```

with:

```tsx
  if (id) {
    return new Promise((resolve, reject) =>
      reject({ props: { id: id as unknown as string } })
    );
  }
```

This won't call the JsonPlaceholder API but will cause an error in the front-end which will be caught and reported to New Relic.

Revert the change.

### Logs in context

[New Relic Logs in context](https://docs.newrelic.com/docs/logs/logs-context/logs-in-context/) feature allows you to see the logs associated with other metrics collected by the agent.
- APM data
- Error data
- Infrastructure data (not in this demo)

With that contextual kowledge you can dig deeper into the pefromance of your app without having to manually search through logs.

Install `pino` npm package:

```bash
npm i pino
```

Create a logger file in `src/utils/logger.ts`:

```ts
import pino from "pino";

export const logger = pino({});
```

Go to [[id].tsx](/src/pages/posts/[id].tsx) 

At the top of the file import the logger:

```tsx
import { logger } from "../../utils/logger";
```

on lin 71 add:

```tsx
  logger.info(`getServerSideProps: PostId - ${id}`);
```

Go to [posts.ts](/src/server/api/routers/posts.ts)

import the logger:

```ts
import { logger } from "../../../utils/logger";
```

add `logger.info` to the `getPostById` function:

```ts
  logger.info(`Fetching post with id ${id}`);
```

You can also pass additional attributes:

```ts
  logger.info({ postId: id, procedure: 'getPostById' }, `Fetching post with id ${id}`);
```

For logging errors you can use `logger.error`:

```ts
  logger.error(error, `Error fetching post with id ${id}`);
```