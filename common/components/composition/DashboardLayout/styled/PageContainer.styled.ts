import styled from "styled-components";

import { COLORS } from "@constants";

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${COLORS.BG_DARK};
  color: ${COLORS.TEXT_WHITE};
`;

export default PageContainer;
