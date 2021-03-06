import WorkListItem from "../works-list-item/works-list-item.component";
import './works-list.styles.css'
import { ListGroup } from "react-bootstrap";
import AddServiceModal from '../../modals/adicionar-servico.modal'


const WorksList = ({ works }) => {
    const userId = localStorage.getItem("userId");;
    let conter = 0;
    return (
        <div>
            <h3>Lista de serviços disponíveis</h3>
            <AddServiceModal userId={userId} />
            <hr />
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