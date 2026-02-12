import styled from "styled-components";
import { COLORS } from "@constants";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalBox = styled.div`
  background: ${COLORS.BG_DARK_CARD};
  border: 1px solid ${COLORS.BORDER_DARK};
  border-radius: 16px;
  padding: 2rem;
  max-width: 800px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
`;

export const ModalTitle = styled.h3`
  color: ${COLORS.TEXT_WHITE};
  font-size: 1.25rem;
  margin: 0 0 0.5rem;
`;

export const ModalSubtitle = styled.p`
  color: ${COLORS.TEXT_GRAY_LIGHT};
  font-size: 0.9rem;
  margin: 0 0 1.5rem;
`;

export const ImageRow = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
`;

export const ImageCard = styled.div`
  flex: 1;
  min-width: 250px;

  img {
    width: 100%;
    border-radius: 8px;
    border: 1px solid ${COLORS.BORDER_DARK};
  }

  .label {
    color: ${COLORS.TEXT_GRAY_LIGHT};
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
`;

export const ModalCloseButton = styled.button`
  background: none;
  border: 1px solid ${COLORS.BORDER_DARK};
  color: ${COLORS.TEXT_GRAY_LIGHT};
  padding: 0.5rem 1.25rem;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${COLORS.TEXT_GRAY_LIGHT};
    color: ${COLORS.TEXT_WHITE};
  }
`;

export const RemovePhotosButton = styled.button`
  background: none;
  border: 1px solid ${COLORS.TEXT_GRAY_MEDIUM};
  color: ${COLORS.TEXT_GRAY_LIGHT};
  padding: 0.5rem 1.25rem;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${COLORS.TEXT_WHITE};
    color: ${COLORS.TEXT_WHITE};
  }
`;

export const ModalDeleteButton = styled.button`
  background: none;
  border: 1px solid ${COLORS.FONT_WARN};
  color: ${COLORS.FONT_WARN};
  padding: 0.5rem 1.25rem;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #ff6b6b;
    color: #ff6b6b;
  }
`;

export const ImageBadge = styled.span`
  display: inline-block;
  margin-left: 0.5rem;
  padding: 0.15rem 0.5rem;
  background: ${COLORS.DARK_GREEN};
  color: ${COLORS.BRIGHT_GREEN};
  font-size: 0.7rem;
  border-radius: 4px;
  vertical-align: middle;
  text-transform: uppercase;
  letter-spacing: 0.03em;
`;
