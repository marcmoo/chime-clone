import type { ReactElement } from "react";
import type { NextPageWithLayout } from "@types";

import Head from "next/head";
import { COLORS } from "@constants";
import { MainLayout } from "@components/composition";
import { EnrollForm } from "@components/elements";
import { MonoSection, DualSection, BannerSection } from "@components/sections";

const SavingsAccountPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>
          Bukiping High Interest Savings | Earn 1.50% APY on Any Balance
        </title>
        <meta name="description" content="Bukiping Clone Account Savings" />
      </Head>

    </>
  );
};

SavingsAccountPage.getLayout = (page: ReactElement) => (
  <MainLayout>{page}</MainLayout>
);

export default SavingsAccountPage;
