import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { Product } from '../types/product';
import { CATEGORY_TABS, CATEGORY_ALL, SORT_OPTIONS, SORT_FEATURED, SORT_NEWEST, SORT_HIGH, SORT_LOW, PAGE_SIZE } from '../constants';
import CategoryTabs from '../components/CategoryTabs';
import SearchSortBar from '../components/SearchSortBar';
import ProductCard from '../components/ProductCard';
import SkeletonCard from '../components/SkeletonCard';
import PricingFilter from '../components/PricingFilter';
import styled from 'styled-components';

function mapPricingOption(option: number): 'Paid' | 'Free' | 'View Only' {
  if (option === 0) return 'Paid';
  if (option === 1) return 'Free';
  return 'View Only';
}

const mapApiProduct = (item: any) => ({
  id: item.id || item.title,
  title: item.title,
  userName: item.creator,
  photoUrl: item.imagePath,
  pricingOption: mapPricingOption(item.pricingOption),
  price: item.price,
  category: item.category || 'garment',
});

const fetchProductsApi = async () => {
  const res = await fetch('https://closet-recruiting-api.azurewebsites.net/api/data');
  const data = await res.json();
  return data.map(mapApiProduct);
};

const PageWrapper = styled.div`
  padding: 24px;
  background: #18181a;
  min-height: 100vh;
`;
const ProductGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

const ProductList: React.FC = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(CATEGORY_ALL);
  const [pricingOptions, setPricingOptions] = useState<string[]>([]);
  const [sort, setSort] = useState(SORT_FEATURED);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchProductsApi().then(newProducts => {
      setAllProducts(newProducts);
      setLoading(false);
      setPage(1);
    });
  }, []);

  const filteredSortedProducts = useMemo(() => {
    let filtered = allProducts.filter((p: any) => {
      const matchesCategory = selectedCategory === CATEGORY_ALL || p.category === selectedCategory;
      const matchesSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.userName.toLowerCase().includes(search.toLowerCase());
      const matchesPricing = pricingOptions.length === 0 || pricingOptions.includes(p.pricingOption);
      return matchesCategory && matchesSearch && matchesPricing;
    });
    if (sort === SORT_FEATURED || sort === SORT_NEWEST) {
      filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === SORT_HIGH) {
      filtered = filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sort === SORT_LOW) {
      filtered = filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
    }
    return filtered;
  }, [allProducts, selectedCategory, search, pricingOptions, sort]);

  const paginatedProducts = useMemo(() => {
    return filteredSortedProducts.slice(0, page * PAGE_SIZE);
  }, [filteredSortedProducts, page]);

  useEffect(() => {
    setDisplayedProducts(paginatedProducts);
  }, [paginatedProducts]);
  const lastProductRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && displayedProducts.length < filteredSortedProducts.length) {
          setLoading(true);
          setTimeout(() => {
            setPage(prev => prev + 1);
            setLoading(false);
          }, 500);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, displayedProducts.length, filteredSortedProducts.length]
  );

  const handleCategorySelect = useCallback((value: string) => {
    setSelectedCategory(value);
    setPage(1);
  }, []);
  const handleSearch = useCallback((v: string) => {
    setSearch(v);
    setPage(1);
  }, []);
  const handlePricingChange = useCallback((opts: string[]) => {
    setPricingOptions(opts);
    setPage(1);
  }, []);
  const handleSort = useCallback((v: string) => {
    setSort(v);
    setPage(1);
  }, []);
  const handleReset = useCallback(() => {
    setSelectedCategory(CATEGORY_ALL);
    setSearch('');
    setSort(SORT_FEATURED);
    setPricingOptions([]);
    setPage(1);
  }, []);

  return (
    <PageWrapper>
      <CategoryTabs
        tabs={CATEGORY_TABS}
        selected={selectedCategory}
        onSelect={handleCategorySelect}
      />
      <PricingFilter
        selected={pricingOptions}
        onChange={handlePricingChange}
        onReset={handleReset}
      />
      <SearchSortBar
        search={search}
        setSearch={handleSearch}
        sort={sort}
        setSort={handleSort}
        itemCount={filteredSortedProducts.length}
        sortOptions={SORT_OPTIONS}
      />
      <ProductGrid>
        {displayedProducts.map((product, idx) => {
          if (idx === displayedProducts.length - 1) {
            return (
              <ProductCard
                key={product.id}
                product={product}
                ref={lastProductRef}
              />
            );
          }
          return <ProductCard key={product.id} product={product} />;
        })}
        {loading && Array.from({ length: PAGE_SIZE }).map((_, idx) => (
          <SkeletonCard key={idx} />
        ))}
      </ProductGrid>
    </PageWrapper>
  );
};

export default ProductList; 