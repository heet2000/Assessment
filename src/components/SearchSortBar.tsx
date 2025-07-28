import React from 'react';
import styled from 'styled-components';

interface SortOption {
  label: string;
  value: string;
}

interface SearchSortBarProps {
  search: string;
  setSearch: (v: string) => void;
  sort: string;
  setSort: (v: string) => void;
  itemCount: number;
  sortOptions: SortOption[];
}

const BarWrapper = styled.div`
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const ItemCount = styled.div`
  color: #fff;
  font-size: 18px;
  font-weight: 500;
`;
const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;
const SearchInput = styled.input`
  width: 380px;
  padding: 12px 20px;
  border-radius: 32px;
  border: none;
  background: #232326;
  color: #fff;
  font-size: 16px;
  outline: none;
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
`;
const SortSelect = styled.select`
  background: #232326;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 32px 12px 16px;
  font-size: 16px;
  font-weight: 600;
  outline: none;
  cursor: pointer;
  appearance: none;
  min-width: 140px;
`;

const SearchSortBar: React.FC<SearchSortBarProps> = ({ search, setSearch, sort, setSort, itemCount, sortOptions }) => (
  <BarWrapper>
    <ItemCount>{itemCount} Items</ItemCount>
    <Controls>
      <SearchInput
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Find the items you're looking for"
      />
      <SortSelect
        value={sort}
        onChange={e => setSort(e.target.value)}
      >
        {sortOptions.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </SortSelect>
    </Controls>
  </BarWrapper>
);

export default SearchSortBar; 