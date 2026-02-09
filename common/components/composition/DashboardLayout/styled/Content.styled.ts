import styled from "styled-components";

import { BREAKPOINTS } from "@constants";

const Content = styled.main`
  flex: 1;
  padding: 2rem 1.5rem;

  @media (min-width: ${BREAKPOINTS.MD}px) {
    padding: 2rem 3rem;
  }
`;

export default Content;
