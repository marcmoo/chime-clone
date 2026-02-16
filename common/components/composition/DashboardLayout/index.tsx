import * as Styled from "./styled";

import type { FC, ReactNode } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import { useUser } from "@hooks";

interface LayoutProps {
  children: ReactNode;
}

const DashboardLayout: FC<LayoutProps> = ({ children }) => {
  const { pathname, push } = useRouter();
  const { user, setUser } = useUser();

  const handleLogout = () => {
    setUser(null);
    push("/users/log-in");
  };

  return (
    <Styled.PageContainer>
      <Styled.Header>
        <Styled.NavLinks>
          <Link href="/dashboard" passHref legacyBehavior>
            <Styled.Logo>
              <img
                src="/static/components/Header/bukiping-logo.svg"
                alt="Bukiping Logo"
                height={28}
              />
            </Styled.Logo>
          </Link>
          <Link href="/dashboard" passHref legacyBehavior>
            <Styled.NavLink $active={pathname === "/dashboard"}>
              Overview
            </Styled.NavLink>
          </Link>
          <Link href="/dashboard/transfer" passHref legacyBehavior>
            <Styled.NavLink $active={pathname === "/dashboard/transfer"}>
              Move Money
            </Styled.NavLink>
          </Link>
          <Link href="/admin" passHref legacyBehavior>
            <Styled.NavLink $active={pathname === "/admin"}>
              Admin
            </Styled.NavLink>
          </Link>
        </Styled.NavLinks>
        <Styled.UserSection>
          {user && (
            <Styled.UserName>
              {user.firstName} {user.lastName}
            </Styled.UserName>
          )}
          <Styled.LogoutButton onClick={handleLogout}>
            Log Out
          </Styled.LogoutButton>
        </Styled.UserSection>
      </Styled.Header>
      <Styled.Content>{children}</Styled.Content>
    </Styled.PageContainer>
  );
};

export default DashboardLayout;
