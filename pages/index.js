import Head from 'next/head'
import Layout from './layout'

export default function Home() {
  return (
    <div >
      <Head>
        <title>BOLUN | বলুন</title>
        <link rel="jpg" href="../public/fav.jpg" />
        {/* https://i.imgur.com/plTW0Nc.jpg*/}
      </Head>

    <Layout />

    </div>
  )
}
