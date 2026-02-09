import type { SafeUser } from "@interfaces";

import { gql } from "@apollo/client";
import client from "@lib/apollo-client";

interface LoginValues {
  email: string;
  password: string;
}

const LOGIN_MUTATION = gql`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      accessToken
      user {
        email
        firstName
        lastName
      }
    }
  }
`;

const loginUser = async (
  loginData: LoginValues,
  onSuccess?: (safeUserData: SafeUser) => void,
  onFailure?: (msg: string) => void
): Promise<boolean> => {
  try {
    const { data } = await client.mutate({
      mutation: LOGIN_MUTATION,
      variables: {
        loginInput: {
          email: loginData.email,
          password: loginData.password,
        },
      },
    });

    const { accessToken, user } = data.login;
    localStorage.setItem("accessToken", accessToken);

    const safeUserData: SafeUser = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    onSuccess && onSuccess(safeUserData);
    return true;
  } catch (error: any) {
    const msg =
      error?.graphQLErrors?.[0]?.message ||
      error?.message ||
      "Internal Server Error";
    onFailure && onFailure(msg);
    return false;
  }
};

export default loginUser;
