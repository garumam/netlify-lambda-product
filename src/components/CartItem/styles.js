import styled from 'styled-components';

export const Container = styled.li`
  display: grid;
  grid-template-columns: 100px 1fr;
  grid-template-areas:
    'image title'
    'image price'
    'close qtd'
    'close total';
  grid-template-rows: repeat(3, 33px) 1fr;
  grid-gap: 0.8rem;
  padding: 1rem;
  width: 100%;

  & + li {
    border-top: dashed 1px ${(props) => `rgba(${props.theme.bgSCRGB}, 0.3)`};
  }

  & > svg {
    cursor: pointer;
    grid-area: close;
    align-self: center;
    justify-self: center;
    font-size: 1.5rem;
    fill: ${(props) => props.theme.textColorTitles};
  }

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
  }

  & > p {
    grid-area: qtd;
  }

  & > span {
    grid-area: price;
    color: ${(props) => props.theme.extraColorLight};
  }

  & > h3 {
    grid-area: total;
    color: ${(props) => props.theme.textColorTitles};
  }

  small {
    color: ${(props) => props.theme.textColor};
    font-size: small;
  }
`;

export const QtdFieldSet = styled.fieldset`
  grid-area: qtd;
  display: inline-block;

  & > label {
    padding-right: 0.5rem;
  }

  & > input {
    background: transparent;
    border: solid 1px ${(props) => props.theme.extraColorLight};
    border-radius: 5px;
    color: ${(props) => props.theme.extraColorLight};
    caret-color: ${(props) => props.theme.extraColorLight};
    width: 50px;
    height: 2rem;
    text-align: center;
    outline: none;
  }
`;
