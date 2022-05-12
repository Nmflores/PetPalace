import CardUsers from "../card-users/card-users.component";
import './card-users-list.styles.css'

const CardListUsers = ({ users }) => {
    let conter = 0;
    return (
        <div className='card-list'>
            {users.map((user) => {
                conter++;
                return <CardUsers key={conter} user={user} />
            })}
        </div>
    )
}


export default CardListUsers;