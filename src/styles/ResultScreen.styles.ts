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

export const Score = styled.p`
  font-size: 22px;
  margin-bottom: 8px;
  text-align: center;
  color: ${({ theme }) => theme.text};
`;

export const Message = styled.p`
  font-size: 18px;
  margin-bottom: 16px;
  text-align: center;
  color: ${({ theme }) => theme.text};
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
`;

export const ActionButton = styled.button`
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

export const ReviewButton = styled(ActionButton)`
  background-color: ${({ theme }) => theme.success};

  &:hover {
    background-color: ${({ theme }) => theme.successHover || "#219150"};
  }
`;
