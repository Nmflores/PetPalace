import './card-pets.styles.css'


const Card = ({pet}) => {
        const { ownerId, ownerName, petId, petName, petType, petBreed } = pet;  
        return(
            <div key={petId} className='card-container'>
            <h2>{petName}</h2>
            <p>{petType}</p>
            <p>{petBreed}</p>
            <p>{ownerId}</p>
            <p>{ownerName}</p>
        </div>
        )
}

export default Card;