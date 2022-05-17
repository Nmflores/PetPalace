import PerfilRender from "../perfil-render/perfil-render.component";
import './perfil-card.styles.css'

const PerfilCard = ({ user }) => {
    let conter = 0;
    return (
        <div className='perfil-container'>
            {user.map((user) => {
                conter++;
                return <PerfilRender key={conter} user={user} />
            })}
        </div>
    )
}


export default PerfilCard;