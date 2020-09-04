import styled from 'styled-components';

export const Container = styled.div<{ type: string }>`
  cursor: pointer;
  display: flex;
  z-index: 100;
  position: fixed;
  min-width: 150px;
  min-height: 40px;
  max-width: 250px;
  max-height: 500px;
  overflow-y: hidden;
  padding: 0.5rem;
  background: red;
  left: 50%;
  transform: translateX(-50%);
  top: -600px;
  background: ${(props) => props.theme.bgPrimaryColor};
  border: solid 1px
    ${(props) =>
      props.type === 'success'
        ? props.theme.extraColorLight
        : props.theme.textColorTitles};
  border-radius: 10px;
  transition: top 0.5s ease-in-out;
  box-shadow: 0 0 2px 2px
    ${(props) =>
      props.type === 'success'
        ? props.theme.extraColorLight
        : `rgba(${props.theme.bgSCRGB}, 0.6)`};

  & > :first-child {
    margin-right: 0.5rem;
    min-width: 20px;
    min-height: 20px;
    fill: ${(props) =>
      props.type === 'success'
        ? props.theme.extraColorLight
        : props.theme.textColorTitles};
  }

  & > :last-child {
    width: 100%;
    p {
      line-height: 1.5rem;
    }
    p + p {
      border-top: dashed 1px
        ${(props) =>
          props.type === 'success'
            ? props.theme.extraColorLight
            : `rgba(${props.theme.bgSCRGB}, 0.6)`};
    }
  }
`;
