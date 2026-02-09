import styled from "styled-components";
import { COLORS } from "@constants";

const TransferButton = styled.button`
  width: 100%;
  background-color: ${COLORS.BRIGHT_GREEN};
  color: ${COLORS.BG_DARK};
  border: none;
  border-radius: 8px;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    background-color: ${COLORS.TEXT_GRAY_MEDIUM};
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export default TransferButton;
