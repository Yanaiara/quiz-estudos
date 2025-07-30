import styled, { css } from "styled-components";

export const Container = styled.div`
  padding: 24px;
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
`;

export const Card = styled.div<{ flipped: boolean }>`
  position: relative;
  width: 100%;
  height: 300px;
  margin: 40px 0;
  perspective: 1000px;
  cursor: pointer;
`;

const sharedFaceStyles = css`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  backface-visibility: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  padding: 20px;
  transition: transform 0.6s;
  background-color: white;
`;

export const Front = styled.div`
  ${sharedFaceStyles};
  transform: rotateY(0deg);
  z-index: 2;
`;

export const Back = styled.div`
  ${sharedFaceStyles};
  transform: rotateY(180deg);
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 20px;
`;

export const NavButton = styled.button`
  background-color: #f0f0f0;
  color: #333;
  padding: 10px 20px;
  font-size: 15px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: #ddd;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const FlippingCard = styled.div<{ flipped: boolean }>`
  width: 100%;
  height: 100%;
  position: relative;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  transform: ${({ flipped }) => (flipped ? "rotateY(180deg)" : "rotateY(0deg)")};
`;
