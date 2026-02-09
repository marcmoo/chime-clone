import styled from "styled-components";
import { getMedia } from "@utils";

const Container = styled.div`
  padding: 0;

  ${getMedia("md")} {
    padding: 0 1rem;
  }
`;

export default Container;
