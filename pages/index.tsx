import { HomePageComponents } from "@components/pages";

import type { ReactElement } from "react";
import type { NextPageWithLayout } from "@types";

import { useRef } from "react";
import Head from "next/head";
import Image from "next/image";

import { COLORS } from "@constants";
import { MainLayout } from "@components/composition";
import { DualSection, BannerSection } from "@components/sections";
import {
  BrandsLogoLine,
  EnrollForm,
  ToggleSectionWrapper,
} from "@components/elements";

const HomePage: NextPageWithLayout = () => {
  const inputsRef = useRef<HTMLInputElement[]>([]);

  return (
    <>


      {/* 1 */}


      <BrandsLogoLine />


      {/* <DualSection
        img={{
          float: "right",
          src: "/static/pages/home/spot-me-1.png",
          alt: "SpotMe 1",
          originalSize: [792, 526],
          width: {
            sm: 450,
            lg: 450,
          },
        }}
      >
        <h2>Overdraft fee-free with SpotMe</h2>

        <p>
          We&apos;ll spot you up to $200 on debit card purchases with no
          overdraft fees. Eligibility requirements apply.<sup>1</sup>
        </p>

        <HomePageComponents.LearnMoreButton />
      </DualSection> */}

      {/* 3 */}
      {/* <DualSection
        img={{
          float: "left",
          src: "/static/pages/home/paid-early.png",
          alt: "Paid Early",
          originalSize: [713, 202],
          width: {
            sm: 490,
            md: 400,
          },
        }}
        backgroundColor={COLORS.GRAY_LIGHT}
      >
        <h2>Get paid early</h2>

        <p>
          Set up direct deposit and get your paycheck up to 2 days earlier than
          some of your co-workers!<sup>2</sup>
        </p>

        <HomePageComponents.LearnMoreButton />
      </DualSection> */}

      {/* 4 */}
      {/* <DualSection
        img={{
          float: "right",
          src: "/static/pages/home/no-fees.png",
          alt: "No Fees",
          originalSize: [644, 322],
          width: {
            sm: 490,
          },
        }}
      >
        <h2>Say goodbye to monthly fees</h2>

        <p>
          No overdraft. No minimum balance. No monthly fees. No foreign
          transaction fees. 60,000+ fee-free ATMs<sup>3</sup> at stores you
          love, like Walgreens<sup>®</sup>, CVS<sup>®</sup>, 7-Eleven
          <sup>®</sup>, and Circle K. Out-of-network fees apply.
        </p>

        <HomePageComponents.LearnMoreButton />
      </DualSection> */}

      {/* 5 */}
      {/* <DualSection
        img={{
          float: "left",
          src: "/static/pages/home/credit-builder.png",
          alt: "Credit Builder",
          originalSize: [826, 670],
          width: {
            sm: 340,
            md: 340,
          },
        }}
        backgroundColor={COLORS.GRAY_LIGHT}
      >
        <h2>A new way to build credit</h2>

        <p>
          Help increase your FICO Score<sup>®</sup> by an average of 30 points
          with our new secured credit card.<sup>4</sup> No interest, no annual
          fees, no credit check to apply. Eligibility requirements apply.
          <sup>5</sup>
        </p>

        <HomePageComponents.LearnMoreButton />

        <p>
          <small>
            Regular on-time payment history can have a positive impact on your
            credit score.
          </small>
        </p>
      </DualSection> */}

      {/* 6 */}

    </>
  );
};

HomePage.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;

export default HomePage;
