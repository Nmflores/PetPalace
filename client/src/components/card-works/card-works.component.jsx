//import './card-pets.styles.css'


const CardWorks = ({work}) => {
        const { service_id, service_name } = work;  
        return(
            <div key={service_id} className='card-container'>
            <p>{service_name}</p>
            <button>Excluir serviço X</button>
        </div>
        )
}

export default CardWorks;