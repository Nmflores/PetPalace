import CardWorks from "../card-works/card-works.component";
import './card-works-list.styles.css'

const CardListWorks = ({ works }) => {
    let conter = 0;
    return(
        <div className='card-list'>
        {
        works.map((work) => {
            conter ++;
            return <CardWorks key={conter} work={work} />
        })}
    </div>
    )
}


export default CardListWorks;