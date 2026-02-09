import styled from "styled-components";
import { COLORS } from "@constants";

export const DateHeader = styled.div`
  font-size: 0.8rem;
  color: ${COLORS.TEXT_GRAY_MEDIUM};
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 0.75rem 0;
  margin-top: 0.5rem;
`;

export const TransactionRow = styled.div`
  display: flex;
  align-items: center;
  padding: 0.85rem 0;
  border-bottom: 1px solid ${COLORS.BORDER_DARK};

  &:last-child {
    border-bottom: none;
  }
`;

export const IconCircle = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${COLORS.DARK_GREEN};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${COLORS.BRIGHT_GREEN};
  font-weight: 700;
  font-size: 0.85rem;
  flex-shrink: 0;
  margin-right: 0.75rem;
`;

export const TxInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
`;

export const TxName = styled.span`
  color: ${COLORS.TEXT_WHITE};
  font-weight: 600;
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TxDate = styled.span`
  color: ${COLORS.TEXT_GRAY_MEDIUM};
  font-size: 0.8rem;
  margin-top: 2px;
`;

export const TxAmount = styled.span<{ $positive?: boolean }>`
  color: ${({ $positive }) => ($positive ? COLORS.BRIGHT_GREEN : COLORS.TEXT_WHITE)};
  font-weight: 700;
  font-size: 0.95rem;
  flex-shrink: 0;
  margin-left: 1rem;
`;

export const EmptyState = styled.p`
  color: ${COLORS.TEXT_GRAY_MEDIUM};
  text-align: center;
  padding: 2rem 0;
  font-size: 0.9rem;
`;
