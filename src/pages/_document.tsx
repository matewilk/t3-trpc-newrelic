import newrelic from "newrelic";
import type { DocumentContext, DocumentInitialProps } from "next/document";
import Document, { Html, Head, Main, NextScript } from "next/document";

type DocumentProps = {
  browserTimingHeader: string;
};

class MyDocument extends Document<DocumentProps> {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps & DocumentProps> {
    const initialProps = await Document.getInitialProps(ctx);

    /**
     * For SSG pages the build is faster than the agent connect cycle
     * In those cases, let's wait for the agent to connect before getting
     * the browser agent script.
     */
    if (!newrelic.agent.collector.isConnected()) {
      await new Promise((resolve) => {
        newrelic.agent.on("connected", resolve);
      });
    }

    const browserTimingHeader = newrelic.getBrowserTimingHeader({
      hasToRemoveScriptWrapper: true,
    });

    return {
      ...initialProps,
      browserTimingHeader,
    };
  }

  render() {
    return (
      <Html>
        <Head>
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{ __html: this.props.browserTimingHeader }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
