# Create T3 App + New Relic Full Stack Monitoring

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

- [Next.js](https://nextjs.org)
- ~~[NextAuth.js](https://next-auth.js.org)~~
- ~~[Prisma](https://prisma.io)~~
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)


## How do I use it?

This is a sample project you can use to learn about integrating [New Relic](https://newrelic.com/) with the [T3 Stack](https://create.t3.gg/). It is a simple Next.js application integrated with New Relic's [Browser agent](https://github.com/newrelic/newrelic-browser-agent) and [Node.js agent](https://github.com/newrelic/node-newrelic) to monitor the performance of your application.

## New Relic Browser agent integration

The New Relic Browser agent is a JavaScript agent that monitors the performance of your application in the browser. It is installed as a dependency in the `package.json` file and loaded in the [`pages/_document.tsx`](/src/pages/_document.tsx) file.

```js
const browserTimingHeader = newrelic.getBrowserTimingHeader({
  hasToRemoveScriptWrapper: true,
});
```

## New Relic Node.js agent integration

The New Relic Node.js agent is a Node.js module that monitors the performance of your application in the server. This repository also uses [@newrelic/next](https://www.npmjs.com/package/@newrelic/next) `npm` package to instrument `Next.js`.

It is then started via the `package.json` file scripts by running `@newrelic/next` before your `next` command.

```json
"scripts": {
  "dev": "NODE_OPTIONS='-r @newrelic/next' next dev",
  "start": "NODE_OPTIONS='-r @newrelic/next' next start"
  ...
}
```

### Read [How to monitor a Next.js app with New Relic](https://newrelic.com/blog/how-to-relic/nextjs-monitor-application-data) blog post

## Project setup

This is a standard [T3 Stack](https://create.t3.gg/) project with two  additional routes:
- `/blogs` - a list of blogs
- `/posts/[id]` - a single blog post

Both of these routes fetch data using [tRPC](https://trpc.io) procedures which can be found in the [server/api/routers/posts.ts](src/server/api/routers/posts.ts) file.
- `getAllPosts` - fetches a list of blog posts
- `getPostById` - fetches a single blog post

Each procedure fetches data from the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/).

## Learn More

To learn more about [New Relic](https://newrelic.com/), take a look athe the following resources:


- Check out the [Node.js integration page on GitHub](https://github.com/newrelic-experimental/newrelic-nextjs-integration).
- [Sign up for a free New Relic account](https://newrelic.com/signup). Your free account includes 100 GB/month of free data ingest, one free full-access user, and unlimited free basic users.
- [New Relic Documentation](https://docs.newrelic.com/) - learn about New Relic features

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
