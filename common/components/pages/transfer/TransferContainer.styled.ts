import styled from "styled-components";
import { COLORS } from "@constants";

const TransferContainer = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  background-color: ${COLORS.BG_DARK_CARD};
  border: 1px solid ${COLORS.BORDER_DARK};
  border-radius: 16px;
  padding: 2rem;
`;

export default TransferContainer;
