import React, { useState, useRef } from 'react';
import { MdSearch } from 'react-icons/md';
import { useSearchResult } from '../../customHooks/useSearchResult';
import ProductCard from '../../components/ProductCard';
import Loading from '../../components/Loading';

import { Container, SearchContainer } from './styles';

function ProductsList() {
  const [search, setSearch] = useState('');
  const [products, isLoading] = useSearchResult(search);

  const searchInput = useRef<HTMLInputElement>();

  const handleSeach = () => {
    setSearch(searchInput.current.value.trim());
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSeach();
    }
  };

  return (
    <Container>
      <Loading loading={isLoading} />

      <SearchContainer>
        <input onKeyDown={handleKeyDown} ref={searchInput} />
        <MdSearch onClick={handleSeach} />
      </SearchContainer>
      <ul>
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
    </Container>
  );
}

export default ProductsList;
