import styled from "styled-components";

export const Container = styled.div`
  padding: 24px;
  max-width: 800px;
  margin: 0 auto;
`;

export const Title = styled.h1`
  font-size: 26px;
  margin-bottom: 20px;
  text-align: center;
`;

export const StatBox = styled.div`
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 30px;
  font-size: 16px;
  line-height: 1.6;
  text-align: center;
`;

export const QuestionBlock = styled.div`
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 20px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
`;

export const QuestionText = styled.p`
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 10px;
`;

export const AnswerList = styled.ul`
  list-style: none;
  padding-left: 0;
  margin-bottom: 12px;
`;

export const AnswerItem = styled.li<{ isCorrect: boolean; isSelected: boolean }>`
  padding: 8px 12px;
  margin-bottom: 6px;
  border-radius: 6px;
  font-size: 15px;
  background-color: ${({ isCorrect, isSelected }) => {
    if (isCorrect && isSelected) return "#aaf5aa";
    if (isCorrect) return "#d2f7d2";
    if (isSelected) return "#f8bcbc";
    return "#f0f0f0";
  }};
  border: ${({ isSelected }) => (isSelected ? "1px solid #aaa" : "1px solid transparent")};
`;

export const Justification = styled.div`
  font-size: 14px;
  color: #555;
  background: #f4f4f4;
  padding: 10px;
  border-radius: 8px;
`;

export const BackButton = styled.button`
  margin: 20px auto 0;
  display: block;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #eee;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: #ddd;
  }
`;
