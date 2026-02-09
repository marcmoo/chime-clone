import styled from "styled-components";
import { COLORS } from "@constants";
import { getMedia } from "@utils";

export const Table = styled.div`
  background-color: ${COLORS.BG_DARK_CARD};
  border: 1px solid ${COLORS.BORDER_DARK};
  border-radius: 12px;
  overflow: hidden;
`;

export const TableHeader = styled.div`
  display: none;

  ${getMedia("md")} {
    display: grid;
    grid-template-columns: 2fr 1fr 1.5fr 1.5fr;
    padding: 0.75rem 1.25rem;
    background-color: ${COLORS.BG_DARK_SECONDARY};
    font-size: 0.75rem;
    color: ${COLORS.TEXT_GRAY_MEDIUM};
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: 600;
  }
`;

export const TableRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid ${COLORS.BORDER_DARK};

  &:last-child {
    border-bottom: none;
  }

  ${getMedia("md")} {
    display: grid;
    grid-template-columns: 2fr 1fr 1.5fr 1.5fr;
    align-items: center;
    gap: 0;
  }

  &:hover {
    background-color: ${COLORS.BG_DARK_SECONDARY};
  }
`;

export const Cell = styled.div<{ $positive?: boolean }>`
  color: ${({ $positive }) =>
    $positive === true
      ? COLORS.BRIGHT_GREEN
      : $positive === false
      ? COLORS.TEXT_WHITE
      : COLORS.TEXT_WHITE};
  font-size: 0.9rem;

  &.date {
    color: ${COLORS.TEXT_GRAY_LIGHT};
    font-size: 0.85rem;
  }
`;

export const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const ActionButton = styled.button<{ $danger?: boolean }>`
  background: none;
  border: 1px solid
    ${({ $danger }) => ($danger ? COLORS.FONT_WARN : COLORS.BORDER_DARK)};
  color: ${({ $danger }) =>
    $danger ? COLORS.FONT_WARN : COLORS.TEXT_GRAY_LIGHT};
  padding: 0.3rem 0.7rem;
  border-radius: 6px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: ${({ $danger }) => ($danger ? "#ff6b6b" : COLORS.TEXT_WHITE)};
    border-color: ${({ $danger }) =>
      $danger ? "#ff6b6b" : COLORS.TEXT_GRAY_LIGHT};
  }
`;

export const InlineInput = styled.input`
  background-color: ${COLORS.BG_DARK_SECONDARY};
  border: 1px solid ${COLORS.BRIGHT_GREEN};
  color: ${COLORS.TEXT_WHITE};
  padding: 0.3rem 0.5rem;
  border-radius: 4px;
  font-size: 0.85rem;
  width: 100%;
  max-width: 150px;
  outline: none;
`;

export const SectionTitle = styled.h3`
  color: ${COLORS.TEXT_WHITE};
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  margin-top: 1rem;
`;
