import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>VNote Pro</title>
        <meta name="title" content="VNote Pro" />
        <meta name="description" content="Annotate, share, and learn from videos." />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.vnote.pro/" />
        <meta property="og:title" content="VNote Pro" />
        <meta property="og:description" content="Annotate, share, and learn from videos." />
        <meta property="og:image" content="https://objectstorage.ca-toronto-1.oraclecloud.com/p/XRwMBzmXfknfFlObnOaFiCIdJqeCpRMoFJix6H2UEOR-zJC-bSOXxnzxf4NWl-Yj/n/yzpjtx1indjl/b/vnote-pro/o/VNOTE.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.vnote.pro/" />
        <meta property="twitter:title" content="VNote Pro" />
        <meta property="twitter:description" content="Annotate, share, and learn from videos." />
        <meta property="twitter:image" content="https://objectstorage.ca-toronto-1.oraclecloud.com/p/XRwMBzmXfknfFlObnOaFiCIdJqeCpRMoFJix6H2UEOR-zJC-bSOXxnzxf4NWl-Yj/n/yzpjtx1indjl/b/vnote-pro/o/VNOTE.png" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
