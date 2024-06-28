import GenericButton from '../../Auth/userComponents/GenericButton/GenericButton'
import * as S from '../styles/Card&Cards'
import { useNavigate } from 'react-router-dom';


export default function Item({item}) {
    const navigate = useNavigate()
    const {id, img, text, homeId }= item;
    const goOn = ()=>{navigate(`/detail/${id}`)}
  return (
     <S.Card>
     <GenericButton buttonText={'Detalles'} onClick={goOn}/>
      <S.Image src={img} alt='Not found'/>
      <S.Details>
      <S.Content>
      <h4 style={{margin:'0'}}>Texto: </h4>
      <S.Paragraph>{text}</S.Paragraph>
      </S.Content>
      </S.Details>
      <GenericButton buttonText={'Editar'} onClick={()=>console.log('algo editamos')}/>
      </S.Card>
   
  )
}
