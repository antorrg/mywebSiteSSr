import {useNavigate} from 'react-router-dom'
import {useAuth} from '../Auth/AuthContext/AuthContext'
import { Suspense } from 'react'

export default function Landing () {
    const {authenticated} =useAuth()
    //console.log(authenticated);
    const navigate = useNavigate()
    const goGo = ()=>{authenticated? navigate('/home'): navigate(`/login`)}
    return (
        <>
        <Suspense fallback={<div>Loading...</div>}>
        <img src="https://firebasestorage.googleapis.com/v0/b/misitioweb-d59d3.appspot.com/o/images%2FcarruselGame.png?alt=media&token=be46ecb5-db71-4bfa-b61b-1edbc60b6f04" alt="Image from Firebase" style={{maxWidth:'600px'}} />

        <a onClick={goGo} style={{color:'blue', cursor:'pointer', textDecoration:'underline'}}><h1>Yo soy la landing page</h1></a>
        </Suspense>
        </>
    )
}