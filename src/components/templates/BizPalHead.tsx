import Head from 'next/head';

interface Descripton {
  text?: string;
}

export default function BizPalHead({
  text = 'BizPal - Book with ease, every time!',
}: Descripton) {
  return (
    <>
      <Head>
        <title>BizPal</title>
        <meta name='description' content={text} />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
    </>
  );
}
