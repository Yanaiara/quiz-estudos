import styled from "styled-components";
import { motion } from "framer-motion";

const Wrapper = styled.div`
  display: flex;
  height: 60vh;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #c0392b;
  text-align: center;
  padding: 1rem;
`;

const ErrorScreen = ({ message }: { message: string }) => (
  <Wrapper as={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
    <h2>❌ Erro</h2>
    <p>{message}</p>
  </Wrapper>
);

export default ErrorScreen;
