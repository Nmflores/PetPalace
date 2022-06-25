import WorkListItem from "../works-list-item/works-list-item.component";
import './works-list.styles.css'
import { ListGroup } from "react-bootstrap";
import AddServiceModal from '../../modals/adicionar-servico.modal'


const WorksList = ({ works }) => {
      // GET FROM LOCALSTORAGE
    const userId = '4ac85347-72f7-48e5-a469-eac17735e0c4';
    let conter = 0;
    return (
        <div>
            <h2>Serviços Listados</h2>
            <AddServiceModal userId={userId} />
            <hr></hr>
            <div className='servicesList'>
                {works !== undefined ?
                    <ListGroup ListGroup key={works.serviceId}>
                        {works.map((work) => {
                            return <WorkListItem key={work.serviceId} work={work} />
                        })}
                    </ListGroup> : "Nenhum serviço Disponivel"}
            </div>
        </div >
    )
}

export default WorksList