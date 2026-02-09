import styled from "styled-components";
import { COLORS } from "@constants";

export const Row = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`;

export const SelectGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const Label = styled.label`
  font-size: 0.8rem;
  color: ${COLORS.TEXT_GRAY_LIGHT};
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

export const Select = styled.select`
  width: 100%;
  background-color: ${COLORS.BG_DARK_SECONDARY};
  border: 1px solid ${COLORS.BORDER_DARK};
  color: ${COLORS.TEXT_WHITE};
  padding: 0.7rem 0.75rem;
  border-radius: 8px;
  font-size: 0.9rem;
  outline: none;
  cursor: pointer;

  &:focus {
    border-color: ${COLORS.BRIGHT_GREEN};
  }

  option {
    background-color: ${COLORS.BG_DARK_SECONDARY};
    color: ${COLORS.TEXT_WHITE};
  }
`;

export const SwapButton = styled.button`
  background: none;
  border: 1px solid ${COLORS.BORDER_DARK};
  color: ${COLORS.TEXT_GRAY_LIGHT};
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.1rem;
  margin-top: 0;
  transition: all 0.2s;

  &:hover {
    color: ${COLORS.TEXT_WHITE};
    border-color: ${COLORS.TEXT_GRAY_LIGHT};
  }
`;
