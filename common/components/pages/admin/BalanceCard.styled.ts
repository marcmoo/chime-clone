import styled from "styled-components";
import { COLORS } from "@constants";

const BalanceCard = styled.div`
  background-color: ${COLORS.BG_DARK_CARD};
  border: 1px solid ${COLORS.BORDER_DARK};
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;

  .label {
    font-size: 0.8rem;
    color: ${COLORS.TEXT_GRAY_LIGHT};
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.5rem;
  }

  .balance {
    font-size: 2.5rem;
    font-weight: 700;
    color: ${COLORS.TEXT_WHITE};
  }
`;

export default BalanceCard;
