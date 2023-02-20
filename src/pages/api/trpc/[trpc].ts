import { createNextApiHandler } from "@trpc/server/adapters/next";
import newrelic from "newrelic";

import { env } from "../../../env/server.mjs";
import { createTRPCContext } from "../../../server/api/trpc";
import { appRouter } from "../../../server/api/root";
import { logger } from "../../../utils/logger";

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError:
    env.NODE_ENV === "development"
      ? ({ path, error }) => {
          newrelic.noticeError(error);
          logger.error(error, `❌ tRPC failed on ${path ?? "<no-path>"}`);
          console.error(
            `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
          );
        }
      : undefined,
});
