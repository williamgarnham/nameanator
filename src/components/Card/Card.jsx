import './cardStyles.css'

const Card = ({children}) => {
  return(
    <div className="cardClass">
      {children}
    </div>
  )
}

export default Card;
