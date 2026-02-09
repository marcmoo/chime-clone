import styled from "styled-components";
import { COLORS } from "@constants";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const Modal = styled.div`
  background-color: ${COLORS.BG_DARK_CARD};
  border: 1px solid ${COLORS.BORDER_DARK};
  border-radius: 16px;
  padding: 2rem;
  width: 90%;
  max-width: 400px;
`;

export const Title = styled.h3`
  color: ${COLORS.TEXT_WHITE};
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: center;
`;

export const Detail = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.6rem 0;
  border-bottom: 1px solid ${COLORS.BORDER_DARK};

  &:last-of-type {
    border-bottom: none;
  }
`;

export const DetailLabel = styled.span`
  color: ${COLORS.TEXT_GRAY_LIGHT};
  font-size: 0.9rem;
`;

export const DetailValue = styled.span`
  color: ${COLORS.TEXT_WHITE};
  font-weight: 600;
  font-size: 0.9rem;
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1.5rem;
`;

export const ConfirmButton = styled.button`
  width: 100%;
  background-color: ${COLORS.BRIGHT_GREEN};
  color: ${COLORS.BG_DARK};
  border: none;
  border-radius: 8px;
  padding: 0.9rem;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const CancelButton = styled.button`
  width: 100%;
  background: none;
  border: 1px solid ${COLORS.BORDER_DARK};
  color: ${COLORS.TEXT_GRAY_LIGHT};
  border-radius: 8px;
  padding: 0.9rem;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    color: ${COLORS.TEXT_WHITE};
    border-color: ${COLORS.TEXT_GRAY_LIGHT};
  }
`;

export const SuccessMessage = styled.div`
  text-align: center;
  color: ${COLORS.BRIGHT_GREEN};
  font-weight: 600;
  font-size: 1rem;
  margin-top: 1rem;
`;

export const ErrorMessage = styled.div`
  text-align: center;
  color: ${COLORS.FONT_WARN};
  font-size: 0.9rem;
  margin-top: 0.75rem;
`;
