import React, { useState } from 'react';
import styled from 'styled-components';

const CarouselContainer = styled.div`
  position: relative;
  top: 3rem;
  left: 0;
  width: 99%;
  max-height: 80%;
  overflow: hidden;
`;

const CarouselInner = styled.div`
  display: flex;
  transition: transform 0.5s ease;
  transform: ${({ currentIndex }) => `translateX(-${currentIndex * 100}%)`};
`;

const CarouselItem = styled.div`
  min-width: 100%;
  box-sizing: border-box;
  position: relative;

  img {
    width: 100%;
    display: block;
  }
`;

const Indicators = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;

  button {
    border: none;
    background-color: ${({ isActive }) => (isActive ? '#333' : '#bbb')};
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin: 0 5px;
    cursor: pointer;

    &:focus {
      outline: none;
    }
  }
`;

const ControlButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1;
  ${({ direction }) => direction}: 10px;

  span {
    font-size: 30px;
    color: #333;
  }

  &:focus {
    outline: none;
  }
`;

const CarouselCaption = styled.div`
  position: absolute;
  top: 8rem;
  left: 50;
  max-height:15rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  text-align: left;
  bottom: 3rem;
  z-index: 10;
  margin-top: 5rem;
  background: rgba(255, 255, 255, 0.5); /* Fondo semitransparente */
  backdrop-filter: blur(5px); /* Efecto de desenfoque */
  -webkit-backdrop-filter: blur(10px); /* Efecto de desenfoque para Safari */
  padding: 1.5rem;
  border-radius: 10px; /* Bordes redondeados */
  color: black; /* Asegúrate de que el texto sea visible */

  h1 {
    font-size: 2rem;
  }

  p {
    font-size: 1rem;
  }

  @media (min-width: 768px) {
    bottom: 40px;
    left: 40px;

    h1 {
      font-size: 3rem;
    }

    p {
      font-size: 1.5rem;
    }
  }
`;
const PrimaryButton = styled.a`
    width: 100%;
    padding: 8px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 10px;

&:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}
`

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = [
    {
      src: 'images/proyectoCarrusel1.png',
      alt: 'Rick and Morty 2024',
      title: 'Rick and Morty.',
      description: 'Este es mi primer sitio web, encontrará más detalles abajo.',
      link: 'https://rick-and-morty2024.vercel.app/',
    },
    {
      src: 'images/proyectoCarrusel2.png',
      alt: 'Gameworld e-commerce',
      title: 'Gameworld e-commerce.',
      description: 'Un e-commerce realizado por el equipo de estudiantes de Henry.',
      link: 'https://gameworldeccomerce.vercel.app',
    },
    {
      src: 'images/proyectoCarrusel3.png',
      alt: 'Boscarol Hnos',
      title: 'Boscarol Hnos.',
      description: 'Landing page y administración de vehículos y clientes para un taller mecánico.',
      link: 'https://deployprueba.vercel.app',
    },
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  return (
    <CarouselContainer>
      <CarouselInner currentIndex={currentIndex}>
        {items.map((item, index) => (
          <CarouselItem key={index}>
            <img src={item.src} alt={item.alt} />
            {index === currentIndex && (
              <CarouselCaption>
                <h1>{item.title}</h1>
                <p>{item.description}</p>
                <p>
                  <PrimaryButton href={item.link} target="_blank" rel="noopener noreferrer" >Visite el sitio</PrimaryButton>
                </p>
              </CarouselCaption>
            )}
          </CarouselItem>
        ))}
      </CarouselInner>
      <ControlButton direction="left" onClick={handlePrev}>
        <span>&#10094;</span>
      </ControlButton>
      <ControlButton direction="right" onClick={handleNext}>
        <span>&#10095;</span>
      </ControlButton>
      <Indicators>
        {items.map((_, index) => (
          <button
            key={index}
            isActive={index === currentIndex}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </Indicators>
    </CarouselContainer>
  );
};

export default Carousel;
