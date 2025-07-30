// src/components/UserDashboard.tsx
import { useEffect, useState } from "react";
import styled from "styled-components";

const DashboardBox = styled.div`
  background: #f4f8ff;
  border: 1.5px solid #d0e3ff;
  border-radius: 12px;
  padding: 16px 20px;
  font-size: 15px;
  color: #333;
  width: 100%;
  box-shadow: 0 2px 8px rgba(47, 128, 237, 0.08);
`;

const Stat = styled.p`
  margin: 4px 0;
`;

type Stats = {
    total: number;
    correct: number;
    lastSession: string;
};

const UserDashboard = () => {
    const [stats, setStats] = useState<Stats | null>(null);

    useEffect(() => {
        const saved = localStorage.getItem("userStats");
        if (saved) {
            setStats(JSON.parse(saved));
        }
    }, []);

    if (!stats) return null;

    const { total, correct, lastSession } = stats;
    const percent = total > 0 ? Math.round((correct / total) * 100) : 0;

    return (
        <DashboardBox>
            <strong>Seu desempenho geral:</strong>
            <Stat>✅ Acertos: {correct}</Stat>
            <Stat>📌 Total respondido: {total}</Stat>
            <Stat>📊 Aproveitamento: {percent}%</Stat>
            <Stat>🕒 Última sessão: {lastSession}</Stat>
        </DashboardBox>
    );
};

export default UserDashboard;
