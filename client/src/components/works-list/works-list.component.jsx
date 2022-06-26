import WorkListItem from "../works-list-item/works-list-item.component";
import './works-list.styles.css'
import { ListGroup } from "react-bootstrap";
import AddServiceModal from '../../modals/adicionar-servico.modal'


const WorksList = ({ works }) => {
    console.log(works)
      // GET FROM LOCALSTORAGE
    const userId = '4ac85347-72f7-48e5-a469-eac17735e0c4';
    let conter = 0;
    return (
        <div>
            <h3>Lista de serviços disponiveis</h3>
            <AddServiceModal userId={userId} />
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