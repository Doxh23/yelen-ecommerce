import styled from "styled-components";

export const Picture = styled.img`
  display: flex;
  object-fit: fill;
  height: 100%;
  margin: auto;
`;
export const PictureContent = styled.div`
  width: 50%;
`;
export const ProductContent = styled.div`
  display: flex;
  margin: auto;
  margin-top: 5vh;
  justify-content: flex-end;
  width: 80%;
  display: flex;
  flex-direction: column;
`;

export const Products = styled.div`
  display: flex;
  flex-direction: row;
`;
export const Content = styled.div`
  width: 50%;
  > * {
    margin: 20px auto;
  }
`;

export const DivQuantity = styled.div`
  > *{
    height:30px;
}
  > :nth-child(2n + 1) {
      border: none;
      background: #141414;
      color: white;
    width: 20px;
  }
  > :nth-child(10n + 2) {
    width: 40px;
  }
`;

export const ButtonCart = styled.div`
width: 150px;
height: 35px;
text-align:center;
margin: inherit;
background-color: tomato;
border-radius: 25px;
`
