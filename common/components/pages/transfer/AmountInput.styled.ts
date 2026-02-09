import styled from "styled-components";
import { COLORS } from "@constants";

export const AmountWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1.5rem 0 2rem;
`;

export const DollarSign = styled.span`
  font-size: 3rem;
  font-weight: 700;
  color: ${COLORS.TEXT_WHITE};
  margin-right: 0.25rem;
`;

export const AmountField = styled.input`
  background: none;
  border: none;
  border-bottom: 2px solid ${COLORS.BORDER_DARK};
  color: ${COLORS.TEXT_WHITE};
  font-size: 3rem;
  font-weight: 700;
  text-align: center;
  width: 200px;
  outline: none;
  padding-bottom: 0.25rem;

  &:focus {
    border-bottom-color: ${COLORS.BRIGHT_GREEN};
  }

  &::placeholder {
    color: ${COLORS.TEXT_GRAY_MEDIUM};
  }
`;
