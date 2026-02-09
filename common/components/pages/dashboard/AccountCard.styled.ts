import styled from "styled-components";
import { COLORS } from "@constants";

const AccountCard = styled.div`
  background-color: ${COLORS.BG_DARK_CARD};
  border: 1px solid ${COLORS.BORDER_DARK};
  border-radius: 12px;
  padding: 1.5rem;

  .label {
    font-size: 0.8rem;
    color: ${COLORS.TEXT_GRAY_LIGHT};
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.25rem;
  }

  .type {
    font-size: 0.95rem;
    font-weight: 600;
    color: ${COLORS.TEXT_WHITE};
    margin-bottom: 0.75rem;
  }

  .balance {
    font-size: 2rem;
    font-weight: 700;
    color: ${COLORS.TEXT_WHITE};
    margin-bottom: 1rem;
  }

  .view-btn {
    display: inline-block;
    background-color: ${COLORS.BRIGHT_GREEN};
    color: ${COLORS.BG_DARK};
    border: none;
    border-radius: 20px;
    padding: 0.4rem 1.2rem;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.9;
    }
  }
`;

export default AccountCard;
