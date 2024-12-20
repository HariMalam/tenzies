import PropTypes from 'prop-types';

function Die(props) {
    return (
        <div className={`die-face ${props.isHeld ? 'dice-held' : ''}`} onClick={props.holdDie}>
            <h2 className='die-value'>{props.value}</h2>
        </div>
    )
}

Die.propTypes = {
    value: PropTypes.number.isRequired,
    isHeld: PropTypes.bool.isRequired,
    holdDie: PropTypes.func.isRequired,
};

export default Die
