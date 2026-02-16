import type { ReactElement } from "react";
import type { NextPageWithLayout } from "@types";

import Head from "next/head";
import Image from "next/image";

import { COLORS } from "@constants";
import { MainLayout } from "@components/composition";
import { EnrollForm } from "@components/elements";
import {
  MonoSection,
  DualSection,
  BannerSection,
  PlaceholderSection,
} from "@components/sections";

const NoFeesPage: NextPageWithLayout = () => {
  return (
    <>


      {/* 1 */}
    </>
  );
};

NoFeesPage.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;

export default NoFeesPage;
