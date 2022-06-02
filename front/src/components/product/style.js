import styled from "styled-components";

export const Picture = styled.img`
  display: flex;
  object-fit: fill;
  height: 100%;
  margin: auto;
`;
export const Content = styled.div`
display:block;
  width: 50%;
  > * {
    margin: 20px 0;
  }
`;

export const DivQuantity = styled.div`
  > *{
    height:30px;
}
`;
export const InputQuantity = styled.input`
width: 40px;
`
export const ButtonQuantity = styled.button`
border: none;
background: tomato;
color: white;
width: 20px;
`

export const ButtonCart = styled.a`
display: flex;
width: 100px;
margin: 0 0;
self-align:flex start;
height: 30px;
background-color: tomato;
border-radius: 25px;
 & {
    color white;
    transition: transform 0.1s ease-in;
}
*{
    margin:auto;
}
 &:hover {
     transform : scale(1.2);
    font-weight:600;
}
`
