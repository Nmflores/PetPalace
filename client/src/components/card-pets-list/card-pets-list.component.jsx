import CardPets from "../card-pets/card-pets.component";
import './card-pets-list.styles.css'

const CardListPets = ({ pets }) => {
    let conter = 0;
    return (
        <div className='card-list'>
            {pets.map((pet) => {
                conter++;
                return <CardPets key={conter} pet={pet} />
            })}
        </div>
    )
}


export default CardListPets;