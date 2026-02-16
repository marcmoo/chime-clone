import { LogInComponents } from "@components/pages";

import type { Email, Password, NextPageWithLayout } from "@types";

import { ReactElement, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { loginUser } from "@services";
import { useUser } from "@hooks";
import { ModalLayout } from "@components/composition";

interface FormValues {
  email: Email;
  password: Password;
}

const LogInPage: NextPageWithLayout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const [loginErrorMsg, setLoginErrorMsg] = useState<string>("");

  const { push: navigate } = useRouter();

  const { user, setUser } = useUser();

  const onSubmit = (loginData: FormValues) => {
    loginUser(
      loginData,
      safeUserData => {
        setLoginErrorMsg("");
        setUser(safeUserData);
        navigate("/");
      },
      msg => {
        setLoginErrorMsg(msg);
      }
    );
  };

  useEffect(() => {
    if (user) console.info(`Logged in as ${user.firstName} ${user.lastName}`);
  }, [user]);

  return (
    <LogInComponents.Container>
      <Head>
        <title>Member Login | Bukiping</title>
        <meta name="description" content="Bukiping Clone Member Log In" />
      </Head>

      <LogInComponents.Logo>
        <Link href="/">
          <a>
            <Image
              src="/static/components/Header/bukiping-logo.svg"
              alt="Bukiping Logo"
              width="130px"
              height="39px"
            />
          </a>
        </Link>
      </LogInComponents.Logo>

      <LogInComponents.Form.Container onSubmit={handleSubmit(onSubmit)}>
        {/* Email */}
        <LogInComponents.Form.Input
          type="email"
          placeholder="Email address"
          {...register("email", {
            required: "required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please correct your email address",
            },
          })}
        />
        {errors.email && (
          <LogInComponents.Form.Error>
            {errors.email.message}
          </LogInComponents.Form.Error>
        )}

        {/* Password */}
        <LogInComponents.Form.Input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "required",
            minLength: {
              value: 5,
              message: "Please correct your password",
            },
          })}
        />
        {errors.password && (
          <LogInComponents.Form.Error>
            {errors.password.message}
          </LogInComponents.Form.Error>
        )}

        {/* Submit */}
        <LogInComponents.Form.Submit disabled={isSubmitting} type="submit">
          Login
        </LogInComponents.Form.Submit>
        {loginErrorMsg !== "" && (
          <LogInComponents.Form.Error>
            {loginErrorMsg}
          </LogInComponents.Form.Error>
        )}
      </LogInComponents.Form.Container>

      <LogInComponents.Text1>
        By clicking &quot;Log In&quot;, you agree to receive SMS text messages from Bukiping
        to verify your identity
      </LogInComponents.Text1>

      <LogInComponents.Text2>
        © 2022 Bukiping. All Rights Reserved.
      </LogInComponents.Text2>

      <LogInComponents.Text3>
        Banking Services provided by The Bancorp Bank or Stride Bank, N.A.,
        Members FDIC. The Bukiping Visa® Debit Card is issued by The Bancorp Bank
        or Stride Bank pursuant to a license from Visa U.S.A. Inc. and may be
        used everywhere Visa debit cards are accepted. Please see back of your
        Card for its issuing bank.
      </LogInComponents.Text3>
    </LogInComponents.Container>
  );
};

LogInPage.getLayout = (page: ReactElement) => <ModalLayout>{page}</ModalLayout>;

export default LogInPage;
