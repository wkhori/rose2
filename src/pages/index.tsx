import type { NextPage } from "next";
import Head from "next/head";
import { HomeView } from "../views";

const Home: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>ROSE ON SOL</title>
        <meta
          name="description"
          content="ROSE ON SOL"
        />
      </Head>
      <HomeView />
    </div>
  );
};

export default Home;
