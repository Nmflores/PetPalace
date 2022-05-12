import './card-users.styles.css'


const CardUsers = ({user}) => {
        const { userId, firstName, secondName } = user;  
        return(
            <div key={userId} className='card-container'>
            <h2>{firstName} {secondName}</h2>
            <p>{userId}</p>
        </div>
        )
}

export default CardUsers;