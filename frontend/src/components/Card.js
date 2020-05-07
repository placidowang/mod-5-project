import React from 'react'
import { connect } from 'react-redux'
import './Card.css'

class Card extends React.Component {
  render() {
    if (this.props.card) {
      return(
        <div className={`card ${this.props.card.name.toLowerCase()}`}>
            <p className='card-name'>{this.props.card.name.toUpperCase()}</p>
          <img className='portrait' src={`./images/${this.props.card.name.toLowerCase()}.png`} alt={this.props.card.name} />
          <div className='card-info'>
            {/* <h3>{this.props.card.action}</h3> */}
            {/* <h3>{this.props.card.effect}</h3> */}
            <p>{this.props.card.description}</p>
          </div>
        </div>
      )

    } else {
      return (
        <div className={'card'}>
          <img className={'cardback'} src={'./images/cardback.png'} alt={'cardback'}/>
        </div>
      )
    }
    
  }
}

export default connect()(Card)