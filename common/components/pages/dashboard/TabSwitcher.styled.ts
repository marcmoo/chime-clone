import styled from "styled-components";
import { COLORS } from "@constants";

export const TabBar = styled.div`
  display: flex;
  gap: 0;
  margin-bottom: 1rem;
  border-bottom: 1px solid ${COLORS.BORDER_DARK};
`;

export const Tab = styled.button<{ $active?: boolean }>`
  background: none;
  border: none;
  color: ${({ $active }) => ($active ? COLORS.TEXT_WHITE : COLORS.TEXT_GRAY_MEDIUM)};
  font-size: 0.95rem;
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  padding: 0.75rem 1.25rem;
  cursor: pointer;
  border-bottom: 2px solid ${({ $active }) => ($active ? COLORS.BRIGHT_GREEN : "transparent")};
  margin-bottom: -1px;
  transition: color 0.2s;

  &:hover {
    color: ${COLORS.TEXT_WHITE};
  }
`;
