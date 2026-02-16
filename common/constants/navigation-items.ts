import type { NavigationItem } from "@interfaces";

const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    label: "Benefits",
    path: "/no-fees",
    subitems: [
      {
        label: "No Monthly Fees",
        path: "/no-fees",
      },
      {
        label: "Free Debit Card",
        path: "/debit-card",
      },
      {
        label: "Fee-Free Overdraft",
      },
      {
        label: "Build Credit",
      },
      {
        label: "Get Paid Early",
        path: "/get-paid-early",
      },
      {
        label: "60,000+ Fee-Free ATMs",
      },
      {
        label: "High Yield Savings Account",
        path: "/savings-account",
      },
      {
        label: "Send and Receive Money",
      },
      {
        label: "Security and Control",
        path: "/security-and-control",
      },
    ],
  },
  {
    label: "Accounts",
    path: "/savings-account",
    subitems: [
      {
        label: "Checking Account",
      },
      {
        label: "Credit Builder",
      },
      {
        label: "Savings Account",
        path: "/savings-account",
      },
    ],
  },
  {
    label: "Who we are",
    path: "/bukiping-financial",
    subitems: [
      {
        label: "About Us",
        // path: '/about-us',
      },
      {
        label: "In the News",
      },
      {
        label: "Bukiping Financial, Inc.",
        path: "/bukiping-financial",
      },
      {
        label: "In The Community",
      },
      {
        label: "Careers",
      },
    ],
  },
  {
    label: "Learn",
    path: "/faq",
    subitems: [
      {
        label: "Blog",
      },
      {
        label: "Help Center",
      },
      {
        label: "FAQs",
        path: "/faq",
      },
      {
        label: "Online Banking",
      },
      {
        label: "Tax Refund",
      },
    ],
  },
];

export default NAVIGATION_ITEMS;
