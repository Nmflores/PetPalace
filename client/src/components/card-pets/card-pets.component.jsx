//import './card-pets.styles.css'


const CardPets = ({pet}) => {
        const { petId, petName } = pet;  

        return(
            <div key={petId} className='card-container'>
            <p>{petName}</p>
            <button>Editar Pet X</button>
            <button>Excluir Pet X</button>
        </div>
        )
}

export default CardPets;