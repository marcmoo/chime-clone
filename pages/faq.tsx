import { FaqPageComponents } from "@components/pages";

import type { ReactElement } from "react";
import type { NextPageWithLayout } from "@types";

import Head from "next/head";
import { COLORS } from "@constants";
import { MainLayout } from "@components/composition";
import { BannerSection, MonoSection } from "@components/sections";
import { Disclosure, ContentContainer, EnrollForm } from "@components/elements";

const FaqPage: NextPageWithLayout = () => {
  return (
    <>

    </>
  );
};

FaqPage.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;

export default FaqPage;
