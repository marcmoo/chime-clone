import styled from "styled-components";
import { getMedia } from "@utils";

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-bottom: 1rem;

  ${getMedia("md")} {
    grid-template-columns: 1fr 1fr;
  }
`;

export default Grid;
