import PetsListItem from '../pets-list-item/pets-list-item.component';
import './pets-list.styles.css'
import { ListGroup } from 'react-bootstrap'


const PetsList = ({ pets }) => {
    let conter = 0;
    return (
        <div className='petsCard'>
            <h3>Lista de Pets</h3>
            <button>Adicionar Pet</button>
            <hr></hr>
            <div className="listPets">
            <ListGroup>
                {pets.map((pet) => {
                    conter++;
                    return <PetsListItem key={conter} pet={pet} />
                })}
            </ListGroup>
            </div>
        </div>
    )
}


export default PetsList;