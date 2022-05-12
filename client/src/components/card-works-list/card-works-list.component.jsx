import CardWorks from "../card-works/card-works.component";
//import './card-works-list.styles.css'

const CardListWorks = ({ works }) => {
    let conter = 0;
    return (
        <div className='card-list'>
            <h3>Lista de serviços disponiveis</h3>
            <button>Adicionar serviço</button>
            {works.map((work) => {
                conter++;
                return <CardWorks key={conter} work={work} />
            })}
        </div>
    )
}


export default CardListWorks;