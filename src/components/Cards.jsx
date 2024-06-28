import {useSelector} from 'react-redux'
import Card from './Card'
import {Cardx} from './styles/Card&Cards'


const Cards = ({infos, setView}) => {

  
  return (
    <Cardx >
      {infos?.map((info)=>
      <Card key={info.id} info={info} setView= {setView}/>
      )}
    </Cardx>
  )
}

export default Cards