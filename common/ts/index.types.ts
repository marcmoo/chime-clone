import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";

export type HexColor = `#${string}`;

export type Email = `${string}@${string}.${string}`;

export type FirstName = string;

export type LastName = string;

export type Password = string;

export type Id = string;

export type HttpResponseStatusCode = 200 | 201 | 404 | 409 | 500;

export type HttpResponseStatusMessage =
  | "OK"
  | "Created"
  | "Not Found"
  | "Conflict"
  | "Internal Server Error";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
