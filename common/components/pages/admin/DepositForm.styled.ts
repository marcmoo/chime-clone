import styled from "styled-components";
import { COLORS } from "@constants";

export const FormRow = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: flex-end;
  margin-bottom: 2rem;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const InputLabel = styled.label`
  font-size: 0.8rem;
  color: ${COLORS.TEXT_GRAY_LIGHT};
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

export const Input = styled.input`
  background-color: ${COLORS.BG_DARK_SECONDARY};
  border: 1px solid ${COLORS.BORDER_DARK};
  color: ${COLORS.TEXT_WHITE};
  padding: 0.6rem 0.75rem;
  border-radius: 8px;
  font-size: 0.9rem;
  outline: none;
  min-width: 160px;

  &:focus {
    border-color: ${COLORS.BRIGHT_GREEN};
  }

  &::placeholder {
    color: ${COLORS.TEXT_GRAY_MEDIUM};
  }
`;

export const SubmitButton = styled.button`
  background-color: ${COLORS.BRIGHT_GREEN};
  color: ${COLORS.BG_DARK};
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1.2rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
