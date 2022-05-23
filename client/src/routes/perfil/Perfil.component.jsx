import PerfilCard from "../../components/perfil-card/perfil-card.component";
import { useState, useEffect } from 'react'

export default function Perfil (){
    const [user, setUser] = useState([]);
    //GET USERID FROM LOCALSTORAGE
    const userId = 'aass2123tw3';
    useEffect(() => {
      fetch(`http://localhost:8080/api/v1/users/${userId}`)
        .then((response) => response.json())
        .then((user) => setUser(user));
    }, []);    
    return (
        <PerfilCard user={user}/>
    )
}


