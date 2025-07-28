import React, { forwardRef } from 'react';
import { Product } from '../types/product';
import styled from 'styled-components';

interface ProductCardProps {
  product: Product;
}

const Card = styled.div`
  border: 1px solid #222;
  background: #232326;
  border-radius: 16px;
  padding: 16px;
  width: 220px;
  color: #fff;
`;
const ProductImg = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
  background: #111;
`;
const Title = styled.h3`
  font-size: 18px;
  margin: 12px 0 4px 0;
  color: #fff;
`;
const Info = styled.p`
  color: #aaa;
  margin: 0;
`;
const Price = styled.p`
  color: #fff;
  margin: 8px 0 0 0;
`;

const ProductCard = forwardRef<HTMLDivElement, ProductCardProps>(({ product }, ref) => (
  <Card ref={ref}>
    <ProductImg src={product.photoUrl} alt={product.title} />
    <Title>{product.title}</Title>
    <Info>By: {product.userName}</Info>
    <Info>Type: {product.pricingOption}</Info>
    {product.price !== undefined && <Price>Price: ${product.price}</Price>}
  </Card>
));

export default ProductCard; 