import React from 'react';
import styled from 'styled-components';
import { PRICING_OPTIONS} from '../constants';

interface PricingFilterProps {
  selected: string[];
  onChange: (selected: string[]) => void;
  onReset: () => void;
}

const PricingFilter: React.FC<PricingFilterProps> = ({ selected, onChange, onReset }) => {
  const handleToggle = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter(v => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  const FilterWrapper = styled.div`
    border: 2px solid #4ee1a0;
    border-radius: 8px;
    padding: 24px 32px;
    background: #18181a;
    display: flex;
    align-items: center;
    margin-bottom: 32px;
    justify-content: space-between;
  `;
  const Options = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
  `;
  const Label = styled.span`
    color: #aaa;
    font-weight: 500;
    font-size: 16px;
    margin-right: 16px;
  `;
  const CheckboxLabel = styled.label`
    color: #fff;
    font-weight: 500;
    font-size: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
  `;
  const Checkbox = styled.input`
    width: 18px;
    height: 18px;
    accent-color: #4ee1a0;
    margin-right: 4px;
  `;
  const ResetButton = styled.button`
    color: #aaa;
    background: transparent;
    border: none;
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;
    letter-spacing: 1px;
  `;

  return (
    <FilterWrapper>
      <Options>
        <Label>Pricing Option</Label>
        {PRICING_OPTIONS.map(opt => (
          <CheckboxLabel key={opt.value}>
            <Checkbox
              type="checkbox"
              checked={selected.includes(opt.value)}
              onChange={() => handleToggle(opt.value)}
            />
            {opt.label}
          </CheckboxLabel>
        ))}
      </Options>
      <ResetButton onClick={onReset}>RESET</ResetButton>
    </FilterWrapper>
  );
};

export default PricingFilter; 