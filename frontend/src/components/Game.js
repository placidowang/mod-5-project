import React from 'react';
import { connect } from 'react-redux'
import Player from './Player.js'

class Game extends React.Component {
  componentDidMount(){
    if (this.props.isHost) {
      fetch('http://localhost:3000/deck')
      .then(r => r.json())
      .then(deckData => {
        this.initializeGame(deckData)
      })
    }

    // if (this.props.gameChannel) {
      this.props.pubnub.getMessage(this.props.gameChannel, (msg) => {
        switch (msg.message.type) {
          case 'updateDeck':
            this.props.updateDeck(msg.message.updatedDeck)
            break
          case 'log':
            console.log(msg.message.text)
            break
          default:
            console.error('Unknown game message.')
            console.log(msg)
        }
      })
    // }
    // console.log(`Current players: ${this.props.players.map(player => player)}`)
  }

  initializeGame = (deckData) => {
    const deck = deckData.cards
    this.shuffleDeck(deck)

  }

  componentDidUpdate() {

  }

  shuffleDeck = (deck = [...this.props.deck]) => {
    for (let i = deck.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]]
    }

    this.updateDeck(deck)
  }

  updateDeck = (deck) => {
    this.props.pubnub.publish({
      message: { type: 'updateDeck', updatedDeck: deck },
      channel: this.props.gameChannel
    })
  }

  testMsg = (msg) => {
    this.props.pubnub.publish({
      message: {type: 'log', text: msg},
      channel: this.props.gameChannel
    })
  }

  hereNow = () => {
    this.props.pubnub.hereNow({
      channel: this.props.gameChannel
    })
    .then(console.log)
  }

  render() {
    return (
      <div>
        {/* <p>Players: {this.props.pubnub.hereNow({
          channels: [this.props.pubnub.gameChannel]
        })}</p> */}
        <p>Deck: {this.props.deck.map(card => card.name).join(', ')}</p>
        <button onClick={()=>this.shuffleDeck()}>Shuffle Deck</button>

        <button onClick={() => this.testMsg('GAME YO')}>message</button>
        <button onClick={this.hereNow}>who here</button>

        <Player />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pubnub: state.connectionReducer.pubnub,
    gameChannel: state.connectionReducer.gameChannel,
    isHost: state.connectionReducer.isHost,
    players: state.connectionReducer.players,
    deck: state.gameReducer.deck
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initDeck: ((cards) => dispatch({type: 'initializeDeck', cards: cards})),
    updateDeck: ((deck) => dispatch({type: 'updateDeck', updatedDeck: deck}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)
