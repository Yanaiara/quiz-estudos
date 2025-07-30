import styled, { keyframes } from "styled-components";

// Fade in animation
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Container = styled.div`
  max-width: 480px;
  margin: 5vh auto;
  padding: 32px 24px;
  background-color: ${({ theme }) => theme?.background || "#fff"};
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  gap: 24px;
  animation: ${fadeIn} 0.5s ease;

  @media (max-width: 520px) {
    padding: 24px 16px;
    margin: 4vh 16px;
  }
`;

export const Title = styled.h1`
  text-align: center;
  font-size: 2rem;
  color: ${({ theme }) => theme?.text || "#333"};
  font-weight: 700;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-weight: 500;
  color: ${({ theme }) => theme?.label || "#444"};
  gap: 8px;
`;

export const Input = styled.input`
  padding: 10px 14px;
  border-radius: 8px;
  border: 1.5px solid #ccc;
  font-size: 16px;
  transition: 0.3s;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.15);
  }
`;

export const Select = styled.select`
  padding: 10px 14px;
  border-radius: 8px;
  border: 1.5px solid #ccc;
  font-size: 16px;
  background-color: #fff;
  transition: 0.3s;
  font-family: inherit;

  &:hover {
    border-color: #888;
  }

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.15);
  }
`;

export const Button = styled.button`
  padding: 12px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.25s;
  font-family: inherit;
  box-shadow: 0 4px 14px rgba(0, 123, 255, 0.25);

  &:hover {
    background-color: #005dc1;
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

export const HelperText = styled.p`
  font-size: 14px;
  color: #777;
  margin-top: -12px;
  margin-bottom: 0;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 20px;
`;
