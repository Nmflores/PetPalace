import WorkListItem from "../works-list-item/works-list-item.component";
import './works-list.styles.css'
import { ListGroup } from "react-bootstrap";

const WorksList = ({ works }) => {
    let conter = 0;
    return (
        <div>
            <h3>Lista de serviços disponiveis</h3>
            <button>Adicionar serviço</button>
            <hr></hr>
        <div className='servicesList'>
            <ListGroup>
                {works.map((work) => {
                    conter++;
                    return <WorkListItem key={conter} work={work} />
                })}
            </ListGroup>
        </div>
        </div>
    )
}

export default WorksList