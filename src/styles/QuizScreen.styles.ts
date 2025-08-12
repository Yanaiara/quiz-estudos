import styled from "styled-components";
import { motion } from "framer-motion";

export const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  padding: 24px;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 600px) {
    padding: 16px;
    gap: 16px;
  }
`;

export const ProgressWrapper = styled.div`
  width: 100%;
  height: 12px;
  background-color: ${({ theme }) => theme.border};
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 8px;
`;

export const ProgressBar = styled(motion.div)`
  height: 100%;
  background-color: ${({ theme }) => theme.primary};
  border-radius: 6px;
`;

export const ProgressText = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.text};
  margin-bottom: 16px;
`;

export const QuestionText = styled.p`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.text};
`;

export const Hint = styled.p`
  font-size: 14px;
  font-style: italic;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.textSecondary || "#555"};
`;

export const OptionList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const OptionItem = styled.li.attrs(() => ({
  tabIndex: 0,
  role: "button",
  "aria-pressed": false,
})) <{ bg: string; disabled: boolean }>`
  padding: 12px 16px;
  margin-bottom: 8px;
  border-radius: 6px;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  border: 1px solid ${({ theme }) => theme.border};
  font-size: 16px;
  background-color: ${({ bg }) => bg};
  transition: background-color 0.3s ease, transform 0.1s ease;

  &:hover {
    transform: ${({ disabled }) => (disabled ? "none" : "scale(1.02)")};
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.primary};
  }
`;

export const RationaleBox = styled.div`
  margin-top: 16px;
  background-color: ${({ theme }) => theme.background};
  padding: 12px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text};
`;

export const NextButton = styled.button`
  margin-top: 24px;
  padding: 12px 24px;
  font-size: 16px;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.buttonText || "white"};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  max-width: 240px;

  @media (min-width: 600px) {
    width: auto;
  }

  &:hover {
    background-color: ${({ theme }) => theme.primaryHover};
  }
`;

export const ActionRow = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

export const SmallButton = styled.button`
  padding: 10px 18px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  background-color: #eee;
  color: #333;
  transition: background 0.3s;

  &:hover {
    background-color: #ddd;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const QuestionProgressBar = styled.div<{ width: number }>`
  height: 6px;
  background-color: #f0f0f0;
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 12px;

  &::after {
    content: "";
    display: block;
    height: 100%;
    width: ${({ width }) => width}%;
    background-color: ${({ width }) =>
    width < 50 ? "#ffc107" : width < 90 ? "#17a2b8" : "#28a745"};
    transition: width 0.2s linear;
  }
`;
