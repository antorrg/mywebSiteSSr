import styled from 'styled-components'

export const Labels = styled.button`
    background: linear-gradient(43deg, rgb(153, 166, 229) 0%, rgb(238, 196, 236) 46%, rgb(255, 204, 112) 100%);
      padding: 0.10rem 1rem; /* Ajusta el padding según tu preferencia */
      font-size: 1rem; /* Tamaño de la fuente */
      font-weight: bold; /* Negrita */
      color: rgb(50, 49, 50);
      border: none;
      border-radius: 0.1rem;
      border-top-right-radius: 0px;
      clip-path: polygon(0% 0%, 90% 0%, 100% 80%, 100% 100%, 0% 100%);
      cursor: pointer;
      transition: background 0.3s, transform 0.2s, box-shadow 0.2s;
      & :hover {
      /* background: rgb(211, 175, 147); Cambia el color en hover */
      /* background: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%); */
      background: rgb(2,0,36);
      background: rgb(230,138,18);
      background: linear-gradient(90deg, rgba(230,138,18,1) 0%, rgb(239, 193, 132) 30%, rgba(255,250,66,1) 100%);
    }
    & :active {
      transform: translateY(2px); /* Efecto de hundimiento en click */
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.2); /* Sombra ligera en click */
    }
    & :disabled {
      background: linear-gradient(43deg, rgb(200, 200, 200) 0%, rgb(220, 220, 220) 46%, rgb(240, 240, 240) 100%);
      color: rgb(150, 150, 150);
      cursor: not-allowed;
      opacity: 0.6;
    }
    & :disabled:hover {
      background: linear-gradient(43deg, rgb(200, 200, 200) 0%, rgb(220, 220, 220) 46%, rgb(240, 240, 240) 100%);
      color: rgb(150, 150, 150);
      cursor: not-allowed;
      opacity: 0.6;
    }



`