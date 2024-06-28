import styled from 'styled-components'


export const Cardx = styled.div`
  width: 85vw;
  margin-left: 8rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr ;
  grid-template-rows: 1fr 1fr ;
  grid-gap: 1.25rem; 
  
  `
  export const Link = styled.a`
   color: inherit; /* Heredar el color del elemento padre */
   text-decoration: none; /* Quitar subrayado del enlace */
  
   &:hover {
     text-decoration: underline; /* Subrayado al pasar el ratón */
     cursor: pointer;
   }
  `;
  
export const Card = styled.div`
  max-width: 14rem;
  height: 25rem;
  border: solid grey;
  padding: 1rem;
  margin: 0.5rem;
  margin-left: 8vw;
  
  box-shadow: -10px 1px 6px rgba(0, 0, 0, 0.1), -10px 15px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: -10px 1px 12px rgba(0, 0, 0, 0.2), -10px 15px 12px rgba(0, 0, 0, 0.2);
  }

  &:active {
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.5);
    transform: scale(0.98);
  }
`;

export const Logo = styled.img`
  max-width: 3rem;
  max-height: 3rem;
`;

export const Image = styled.img`
  max-width: 12rem;
  max-height: 13rem;
`;
export const UserImg = styled.img`
  max-width: 8rem;
  max-height: 8rem;
`;
export const Details = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  margin: 0;
  margin:left;
`;
export const ContVert = styled.div`
  display: flex;
  flex-direction:column;
  align-items: start;
  margin:left;
  padding:0;
`;

export const Paragraph = styled.p`
  margin-left: 0.5rem;
  text-align: left;
`;


