import styled from "styled-components";

import { COLORS } from "@constants";

export const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

export const NavLink = styled.a<{ $active?: boolean }>`
  color: ${({ $active }) => ($active ? COLORS.TEXT_WHITE : COLORS.TEXT_GRAY_LIGHT)};
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  padding-bottom: 2px;
  border-bottom: 2px solid ${({ $active }) => ($active ? COLORS.BRIGHT_GREEN : "transparent")};
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: ${COLORS.TEXT_WHITE};
  }
`;

export const Logo = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
`;

export const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const UserName = styled.span`
  color: ${COLORS.TEXT_GRAY_LIGHT};
  font-size: 0.9rem;
`;

export const LogoutButton = styled.button`
  background: none;
  border: 1px solid ${COLORS.BORDER_DARK};
  color: ${COLORS.TEXT_GRAY_LIGHT};
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s;

  &:hover {
    color: ${COLORS.TEXT_WHITE};
    border-color: ${COLORS.TEXT_GRAY_LIGHT};
  }
`;
