import styled from "styled-components";

import { COLORS, BREAKPOINTS } from "@constants";

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background-color: ${COLORS.BG_DARK_SECONDARY};
  border-bottom: 1px solid ${COLORS.BORDER_DARK};

  @media (min-width: ${BREAKPOINTS.MD}px) {
    padding: 1rem 3rem;
  }
`;

export default Header;
