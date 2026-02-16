import * as Styled from "./styled";

import type { FC } from "react";

import Image from "next/image";
import Link from "next/link";
import { NAVIGATION_ITEMS, BREAKPOINTS } from "@constants";
import { ContentContainer, InactiveSpan } from "@components/elements";

const Footer: FC = () => {
  return (
    <Styled.Footer>
      <ContentContainer>
        <Styled.TopSection>
          <Styled.MenuSection>
            {NAVIGATION_ITEMS.map((item, idx) => (
              <li key={idx}>
                {item.path ? (
                  <span>
                    <Link href={item.path}>{item.label}</Link>
                  </span>
                ) : (
                  <InactiveSpan width={2}>{item.label}</InactiveSpan>
                )}

                <menu>
                  {item.subitems.map((subitem, idx) => (
                    <li key={idx}>
                      {subitem.path ? (
                        <Link href={subitem.path}>{subitem.label}</Link>
                      ) : (
                        <InactiveSpan>{subitem.label}</InactiveSpan>
                      )}
                    </li>
                  ))}
                </menu>
              </li>
            ))}
          </Styled.MenuSection>

          <Styled.HorizontalLine hideAt={BREAKPOINTS.LG} />

          <Styled.SocialSection>
            <a href="#">
              <Image
                src="/static/components/Footer/app-store.png"
                alt="Bukiping App Store Download"
                width="170px"
                height="40px"
              />
            </a>

            <a href="#">
              <Image
                src="/static/components/Footer/google-play.png"
                alt="Bukiping Google Play Download"
                width="170px"
                height="40px"
              />
            </a>

            <Styled.IconWrapper>
              <a href="#">
                <Image
                  src="/static/components/Footer/facebook-bw.png"
                  alt="Bukiping Facebook"
                  width="32px"
                  height="32px"
                />
              </a>
            </Styled.IconWrapper>

            <Styled.IconWrapper>
              <a href="#">
                <Image
                  src="/static/components/Footer/twitter-bw.png"
                  alt="Bukiping Twitter"
                  width="32px"
                  height="32px"
                />
              </a>
            </Styled.IconWrapper>

            <Styled.IconWrapper>
              <a href="#">
                <Image
                  src="/static/components/Footer/instagram-bw.png"
                  alt="Bukiping Instagram"
                  width="32px"
                  height="32px"
                />
              </a>
            </Styled.IconWrapper>
          </Styled.SocialSection>
        </Styled.TopSection>

        <Styled.HorizontalLine />

        <Styled.DisclaimerSection>
          <p>
            Banking services provided by The Bancorp Bank or Stride Bank, N.A.,
            Members FDIC. The Bukiping Visa® Debit Card is issued by The Bancorp
            Bank or Stride Bank pursuant to a license from Visa U.S.A. Inc. and
            may be used everywhere Visa debit cards are accepted. The Bukiping
            Visa® Credit Builder Card is issued by Stride Bank pursuant to a
            license from Visa U.S.A. Inc. and may be used everywhere Visa credit
            cards are accepted. Please see back of your Card for its issuing
            bank.
          </p>
          <p>
            While Bukiping doesn&apos;t issue personal checkbooks to write checks,
            Bukiping Checkbook gives you the freedom to send checks to anyone,
            anytime, from anywhere. See your issuing bank&apos;s Deposit Account
            Agreement for full Bukiping Checkbook details.
          </p>
          <p>
            By clicking on some of the links above, you will leave the Bukiping
            website and be directed to a third-party website. The privacy
            practices of those third parties may differ from those of Bukiping. We
            recommend you review the privacy statements of those third party
            websites, as Bukiping is not responsible for those third parties&apos;
            privacy or security practices.
          </p>
          <p>
            #1 Most Loved Banking App Source: Bukiping received the highest 2021
            Net Promoter Score among competitors in the industry according to
            Qualtrics®. Bukiping was the 2021 #1 most downloaded banking app in the
            US according to Apptopia®.
          </p>
          <p>
            <sup>1</sup> Bukiping SpotMe is an optional, no fee service that
            requires a single deposit of $200 or more in qualifying direct
            deposits to the Bukiping Checking Account each month and Visa debit
            card activation. All qualifying members will be allowed to overdraw
            their account up to $20 on debit card purchases and cash withdrawals
            initially, but may be later eligible for a higher limit of up to
            $200 or more based on member&apos;s Bukiping Account history, direct
            deposit frequency and amount, spending activity and other risk-based
            factors. Your limit will be displayed to you within the Bukiping mobile
            app. You will receive notice of any changes to your limit. Your
            limit may change at any time, at Bukiping&apos;s discretion. Although
            there are no overdraft fees, there may be out-of-network or third
            party fees associated with ATM transactions. SpotMe won&apos;t cover
            non-debit card transactions, including ACH transfers, Pay Anyone
            transfers, or Bukiping Checkbook transactions. See terms and
            conditions.
          </p>
          <p>
            <sup>2</sup> Early access to direct deposit funds depends on the
            timing of the submission of the payment file from the payer. We
            generally make these funds available on the day the payment file is
            received, which may be up to 2 days earlier than the scheduled
            payment date.
          </p>
          <p>
            <sup>3</sup> Out-of-network ATM withdrawal fees apply except at
            MoneyPass ATMs in a 7-Eleven location or any Allpoint or Visa Plus
            Alliance ATM. Other fees such as third-party and cash deposit fees
            may apply.
          </p>
          <p>
            <sup>4</sup> Based on a representative study conducted by Experian®,
            members who made their first purchase with Credit Builder between
            June 2020 and October 2020 observed an average FICO® Score 8
            increase of 30 points after approximately 8 months. On-time payment
            history can have a positive impact on your credit score. Late
            payment may negatively impact your credit score.
          </p>
          <p>
            <sup>5</sup> To be eligible to apply for Credit Builder, you need to
            have received a qualifying direct deposit of $200 or more to your
            Spending Account within the last 365 days of your application. The
            qualifying direct deposit must have been made by your employer,
            payroll provider, or benefits payer by Automated Clearing House
            (ACH) deposit. Bank ACH transfers, Pay Friends transfers,
            verification or trial deposits from financial institutions, peer to
            peer transfers from services such as PayPal, Cash App, or Venmo,
            mobile check deposits, and cash loads or deposits are not qualifying
            direct deposits.
          </p>
          <p>
            <sup>6</sup> Sometimes instant transfers can be delayed. The
            recipient must use a valid debit card to claim funds. Once you are
            approved for a Bukiping Checking Account, see your issuing bank&apos;s
            Deposit Account Agreement for full Pay Anyone Transfers details.
            Please see the back of your Bukiping debit card for your issuing bank.
            See Terms and Conditions
          </p>
          <p>
            <sup>7</sup> The Annual Percentage Yield (&quot;APY&quot;) for the
            Bukiping Savings Account is variable and may change at any time. The
            disclosed APY is accurate as of August 25th, 2022. No minimum
            balance required. Must have $0.01 in savings to earn interest.
          </p>
          <p>
            Licenses
            <br />
            Bukiping Capital, LLC, Nationwide Multistate Licensing System
            (&quot;NMLS&quot;) ID 2316451
          </p>
          <p>© 2013-2022 Bukiping. All Rights Reserved.</p>
        </Styled.DisclaimerSection>
      </ContentContainer>
    </Styled.Footer>
  );
};

export default Footer;
