import './SingleCard.css'
import imgcover from "../img/cover.png"

export default function SingleCard({ card, handleChoice, cardFlipped, disabled }) {    // destructure card and handleChoice props from App

    const handleClick = () => {
        if (!disabled) {
            handleChoice(card);
        }
    }

    return (
        <div className="card">
            <div className={cardFlipped ? "flipped" : ""}>
                <img className="front" src={card.src} alt="Card front" />
                <img
                    className="back"
                    src={imgcover}
                    onClick={handleClick}
                    alt="Card back"
                />
            </div>
        </div>
    )
}
