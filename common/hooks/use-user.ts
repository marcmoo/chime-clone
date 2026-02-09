import type { SafeUser } from "@interfaces";

import { useState, useEffect, useCallback } from "react";
import { gql, useQuery } from "@apollo/client";

const ME_QUERY = gql`
  query Me {
    me {
      email
      firstName
      lastName
    }
  }
`;

const useUser = (): {
  user: SafeUser | null;
  setUser: (user: SafeUser | null) => void;
} => {
  const [user, setUserState] = useState<SafeUser | null>(null);
  const hasToken =
    typeof window !== "undefined" && !!localStorage.getItem("accessToken");

  const { data } = useQuery(ME_QUERY, {
    skip: !hasToken,
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (data?.me) {
      setUserState(data.me);
    }
  }, [data]);

  const setUser = useCallback((newUser: SafeUser | null) => {
    setUserState(newUser);
    if (!newUser) {
      localStorage.removeItem("accessToken");
    }
  }, []);

  return { user, setUser };
};

export default useUser;
