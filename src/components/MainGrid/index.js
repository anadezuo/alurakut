import styled from "styled-components";

export const MainGrid = styled.main`
width: 100%;
grid-gap: 10px;
margin-left: auto;
margin-right: auto;
max-width: 500px;
padding: 16px;

.profileArea {
  display: none;

  @media(min-width: 860px) {
    display: block;
  }
}

@media(min-width: 860px) {
  max-width: 1110px;
  display: grid;
  grid-template-areas: "profileArea welcomeArea profileRelationsArea";
  //São as informações dos tamanhos das colunas
  grid-template-columns: 160px 1fr 312px;
  //a medida 1fr é uma medida dinâmica no grid, que expande o meio.
  //1 fração do espaço disponível
}
`;