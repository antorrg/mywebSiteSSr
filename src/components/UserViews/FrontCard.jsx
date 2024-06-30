import {useNavigate}from 'react-router-dom'
import styled from 'styled-components'

const FCard = styled.div`
  max-width: 33vw;
  height: 15rem;
  border: none;
  padding: 1rem;
  margin: 0.5rem;
  margin-left: 0.5vw;
  margin-top:4rem;
`
const Logo = styled.img`
  max-width: 5rem;
  max-height: 5rem;
  border-radius:2rem;

`
const Title = styled.p`
font-family: sans-serif;
font-size:2rem;
font-weight: 300;
line-height:1;
`
const Text = styled.p`
   
`
export default function FrontCard ({project}){
    const navigate =useNavigate()
    const {id, logo, title, infoHeader} = project;
    console.log(title)
    const goDetail = ()=>{navigate('/')}
    return(
        <FCard>
        <Logo src={logo} alt='Not found'/>
        <Title>{title}</Title>
        <p>{infoHeader}</p>
        <button onClick={goDetail}>Ver mas...</button>
        </FCard>
    )
}

// --bs-primary: #0d6efd;
//     --bs-secondary: #6c757d;