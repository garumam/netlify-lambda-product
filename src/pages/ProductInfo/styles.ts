import styled from 'styled-components';

export const Container = styled.article`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 300px 50px 50px;
  grid-template-areas:
    'title title'
    'image image'
    'price price'
    'purchase cart';
  grid-gap: 0.8rem;
  padding: ${(props) => props.theme.paddingDefault};
  padding-top: 2rem;
  max-width: 900px;

  & > h2 {
    grid-area: title;
    justify-self: center;
    font-size: 1.8rem;
    color: ${(props) => props.theme.textColorTitles};
    font-weight: 700;
  }

  & > img {
    cursor: pointer;
    grid-area: image;
    justify-self: center;
    width: 100%;
    height: 100%;
    max-width: 300px;
    border-radius: 10px;
    background: ${(props) => props.theme.textColor};
    object-fit: cover;
  }

  & > span {
    grid-area: price;
    align-self: center;
    justify-self: center;
    font-size: 1.5rem;
    color: ${(props) => props.theme.textColorTitles};
    font-weight: 400;
  }

  button {
    height: 40px;
    border-radius: 5px;
    font-weight: 600;
    max-width: 150px;
    width: 100%;
  }

  & > button:nth-last-child() {
    justify-self: self-start;
  }

  & > button:first-of-type {
    grid-area: purchase;
    justify-self: self-end;
  }

  @media (min-width: 900px) {
    width: 100%;
    align-self: center;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: repeat(5, 40px);
    grid-template-areas:
      'image title title'
      'image title title'
      'image price price'
      'image price price'
      'image purchase cart';

    padding-bottom: 2rem;
  }
`;

export const ProductDetail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 200px;
  color: white;
  flex: 1;
  background: ${(props) => props.theme.bgSecondaryColor};
  padding: ${(props) => props.theme.paddingDefault};
  padding-bottom: 2rem;

  & > h3 {
    font-size: 2rem;
    margin-bottom: 1rem;
    max-width: 700px;
    font-weight: 700;
  }

  & > p {
    font-size: 1.2rem;
    max-width: 700px;
    text-align: center;
  }
`;
