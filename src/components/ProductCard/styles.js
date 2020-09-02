import styled from 'styled-components';

export const Container = styled.li`
  display: grid;
  width: 100%;
  background: ${(props) => props.theme.bgPrimaryColor};
  padding: 1rem;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(2, 65px) 1fr;
  grid-template-areas:
    'image title'
    'image price'
    'purchase cart';

  border-radius: 10px;
  align-content: center;
  grid-gap: 0.8rem;

  & > img {
    cursor: pointer;
    grid-area: image;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background: ${(props) => props.theme.textColor};
    object-fit: cover;
  }

  & > a {
    grid-area: title;
    align-self: baseline;
    justify-self: center;
  }

  & > span {
    grid-area: price;
    align-self: center;
    justify-self: center;
  }

  & > button {
    height: 40px;
    border-radius: 5px;
    font-weight: 600;
  }

  & + li {
    margin-top: 0.8rem;
  }

  @media (min-width: 700px) {
    grid-template-rows: 200px repeat(2, 30px) 1fr;
    grid-template-areas:
      'image image'
      'title title'
      'price price'
      'purchase cart';

    & + li {
      margin-top: 0;
    }
  }
`;

export const PurchaseButton = styled.button`
  grid-area: purchase;
`;

export const AddToCartButton = styled.button.attrs({
  active: true,
})`
  grid-area: cart;
  font-size: 1.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-color: ${(props) => props.theme.textColorTitles};

  &:hover,
  &.active {
    background: ${(props) => props.theme.textColorTitles};
    color: ${(props) => props.theme.textColor};
  }
`;
