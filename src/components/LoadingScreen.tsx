import { motion } from "framer-motion";
import styled from "styled-components";

const Wrapper = styled(motion.div)`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1.2rem;
  background-color: #fdfdfd;
  color: #333;
  font-size: 1.2rem;
`;

const DotWrapper = styled.div`
  display: flex;
  gap: 0.3rem;
`;

const Dot = styled(motion.span)`
  font-size: 2rem;
  color: #555;
`;

const LoadingText = styled(motion.p).attrs(() => ({
  role: "status",
  "aria-live": "polite",
}))``;

const LoadingScreen = () => {
  return (
    <Wrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <LoadingText
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Carregando questões
      </LoadingText>

      <DotWrapper>
        <Dot
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 0.8, delay: 0 }}
        >
          •
        </Dot>
        <Dot
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }}
        >
          •
        </Dot>
        <Dot
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }}
        >
          •
        </Dot>
      </DotWrapper>
    </Wrapper>
  );
};

export default LoadingScreen;
