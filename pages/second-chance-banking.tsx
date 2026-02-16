import type { ReactElement } from "react";
import type { NextPageWithLayout } from "@types";

import Head from "next/head";
import { COLORS } from "@constants";
import { MainLayout } from "@components/composition";
import { MonoSection, DualSection, BannerSection } from "@components/sections";
import { EnrollForm, ResponsiveList } from "@components/elements";

const SecondChangeBankingPage: NextPageWithLayout = () => {
  return (
    <>

    </>
  );
};

SecondChangeBankingPage.getLayout = (page: ReactElement) => (
  <MainLayout>{page}</MainLayout>
);

export default SecondChangeBankingPage;
