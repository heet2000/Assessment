import React from 'react';
import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
`;
const Card = styled.div`
  border: 1px solid #222;
  background: #232326;
  border-radius: 16px;
  padding: 16px;
  width: 220px;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const SkeletonBox = styled.div<{ w: string; h: string; mb?: string }>`
  width: ${({ w }) => w};
  height: ${({ h }) => h};
  background: #333;
  border-radius: 8px;
  margin-bottom: ${({ mb }) => mb || 0};
  animation: ${pulse} 1.5s infinite;
`;

const SkeletonCard: React.FC = () => (
  <Card>
    <SkeletonBox w="100%" h="180px" mb="8px" />
    <SkeletonBox w="80%" h="20px" mb="4px" />
    <SkeletonBox w="60%" h="16px" mb="4px" />
    <SkeletonBox w="40%" h="16px" />
  </Card>
);

export default SkeletonCard; 