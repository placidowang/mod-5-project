const initialState = {
  id: NaN,
  username: Math.random().toString(36).slice(2,5),
  // username: '',
  hand: [],
  coins: 2,
  // actions: ['Income', 'Foreign Aid', 'Coup', 'Tax', 'Assassinate', 'Exchange', 'Steal'],
  actions: {
    income: {character: null,
      action: 'Income',
      effect: 'Take 1 coin',
      counteraction: null},
    foreignAid: {character: null,
      action: 'Foreign Aid',
      effect: 'Take 2 coins',
      counteraction: null},
    coup: {character: null,
      action: 'Coup',
      effect: 'Pay 7 coins - Choose player to lose influence',
      counteraction: null},
    tax: {character: 'Duke',
      action: 'Tax',
      effect: 'Take 3 coins',
      counteraction: 'Blocks Foreign Aid'},
    assassinate: {character: 'Assassin',
      action: 'Assassinate',
      effect: 'Pay 3 coins - Choose player to lose influence',
      counteraction: null},
    exchange: {character: 'Ambassador',
      action: 'Exchange',
      effect: 'Exchange cards with Court Deck',
      counteraction: 'Blocks stealing'},
    steal: {character: 'Captain',
      action: 'Steal',
      effect: 'Take 2 coins from another player',
      counteraction: 'Blocks stealing'},
    contessa: {character: 'Contessa',
      action: 'X',
      effect: null,
      counteraction: 'Blocks assassination'}
  },
  myTurn: false,
}

export default function playerReducer(state = initialState, action) {
  switch (action.type) {
    case 'setId':
      return {...state,
        id: action.id
      }
    case 'setUsername':
      return {...state,
        username: action.username
      }
    // case 'drawCard':
    //   state.hand.push(action.card)
    //   return state
    case 'addCardsToHand':
      return {...state,
        hand: [...state.hand, ...action.cards]
      }
    case 'updateCoins':
      return {...state,
        coins: state.coins + action.amt
      }
    default:
      return state
  }
}