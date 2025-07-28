import React from 'react';
import styled from 'styled-components';

interface Tab {
  label: string;
  value: string;
}

interface CategoryTabsProps {
  tabs: Tab[];
  selected: string;
  onSelect: (value: string) => void;
}

const TabsWrapper = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
`;
const TabButton = styled.button<{ selected: boolean }>`
  background: ${({ selected }) => (selected ? '#fff' : 'transparent')};
  color: ${({ selected }) => (selected ? '#18181a' : '#fff')};
  border: none;
  border-radius: 24px;
  padding: 8px 24px;
  font-weight: 600;
  font-size: 18px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
`;

const CategoryTabs: React.FC<CategoryTabsProps> = ({ tabs, selected, onSelect }) => (
  <TabsWrapper>
    {tabs.map((tab) => (
      <TabButton
        key={tab.value}
        selected={selected === tab.value}
        onClick={() => onSelect(tab.value)}
      >
        {tab.label}
      </TabButton>
    ))}
  </TabsWrapper>
);

export default CategoryTabs; 