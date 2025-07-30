import styled from "styled-components";
import { motion } from "framer-motion";

export const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  padding: 24px;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 600px) {
    padding: 16px;
    gap: 16px;
  }
`;

export const Title = styled.h1`
  font-size: clamp(1.5rem, 5vw, 2.2rem);
  margin-bottom: 16px;
  text-align: center;
  color: ${({ theme }) => theme.text};
`;

export const QuestionBlock = styled.div`
  width: 100%;
  margin-bottom: 32px;
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.background};

  @media (max-width: 600px) {
    padding: 12px;
  }
`;

export const QuestionText = styled.p`
  font-weight: 600;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.text};
`;

export const AnswerList = styled.ul`
  list-style: none;
  padding-left: 0;
  margin-bottom: 12px;
`;

export const AnswerItem = styled.li<{
  isCorrect: boolean;
  isSelected: boolean;
}>`
  font-weight: ${({ isCorrect }) => (isCorrect ? "bold" : "normal")};
  color: ${({ isCorrect, isSelected, theme }) =>
    isCorrect
      ? theme.success || "green"
      : isSelected
        ? theme.error || "red"
        : theme.text};
  margin-bottom: 6px;
  word-wrap: break-word;
`;

export const Justification = styled.p`
  font-size: 14px;
  background: ${({ theme }) => theme.justificationBackground || "#f2f2f2"};
  padding: 10px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text};
`;

export const BackButton = styled.button`
  padding: 12px 24px;
  font-size: 16px;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.buttonText || "#fff"};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  max-width: 260px;

  @media (min-width: 600px) {
    width: auto;
  }

  &:hover {
    background-color: ${({ theme }) => theme.primaryHover};
  }
`;
