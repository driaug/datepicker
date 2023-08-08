import { Html, Head, Main, NextScript } from 'next/document';
import GithubCorner from "react-github-corner";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Datepicker | React, Framer Motion & Tailwind</title>
      </Head>
      <body>
        <GithubCorner href="https://github.com/driaug/datepicker" />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
