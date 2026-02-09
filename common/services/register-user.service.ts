import type { RegisterValues } from "@interfaces";

import { gql } from "@apollo/client";
import client from "@lib/apollo-client";

const SIGNUP_MUTATION = gql`
  mutation Signup($signupInput: SignupInput!) {
    signup(signupInput: $signupInput) {
      accessToken
      user {
        email
        firstName
        lastName
      }
    }
  }
`;

const registerUser = async (
  registerData: RegisterValues,
  onSuccess?: () => void,
  onFailure?: (msg: string) => void
): Promise<boolean> => {
  try {
    await client.mutate({
      mutation: SIGNUP_MUTATION,
      variables: {
        signupInput: {
          email: registerData.email,
          password: registerData.password,
          firstName: registerData.firstName,
          lastName: registerData.lastName,
        },
      },
    });

    onSuccess && onSuccess();
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

export default registerUser;
