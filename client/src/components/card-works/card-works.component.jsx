import './card-works.styles.css'


const CardWorks = ({work}) => {
        const { user_id, first_name, second_name, service_id, service_name } = work;  
        return(
            <div key={service_id} className='card-container'>
            <h2>{first_name + second_name}</h2>
            <p>{user_id}</p>
            <p>{service_name}</p>
        </div>
        )
}

export default CardWorks;