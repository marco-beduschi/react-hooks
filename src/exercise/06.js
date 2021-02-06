// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from '../pokemon'

class PokemonInfoErrorBoundary extends React.Component {
  state = {error: false}

  static getDerivedStateFromError(error) {
    return {error}
  }

  render() {
    const {error} = this.state

    if (error) {
      return (
        <div role="alert">
          There was an error:{' '}
          <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
        </div>
      )
    }

    return this.props.children
  }
}

const StatusEnum = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
}

function PokemonInfo({pokemonName}) {
  // 🐨 Have state for the pokemon (null)
  const [state, setState] = React.useState({
    pokemon: null,
    status: StatusEnum.IDLE,
    error: null,
  })

  React.useEffect(() => {
    if (pokemonName === '') {
      return
    }

    setState({status: StatusEnum.PENDING})
    fetchPokemon(pokemonName)
      .then(pokemon => {
        setState({
          pokemon,
          status: StatusEnum.RESOLVED,
          error: null,
        })
      })
      .catch(error => {
        setState({status: StatusEnum.REJECTED, error})
      })
  }, [pokemonName])

  switch (state.status) {
    case StatusEnum.IDLE:
      return 'Submit a pokemon'
    case StatusEnum.PENDING:
      return <PokemonInfoFallback name={pokemonName} />
    case StatusEnum.REJECTED:
      throw state.error
    case StatusEnum.RESOLVED:
      return <PokemonDataView pokemon={state.pokemon} />
    default:
      throw new Error('this should be impossible')
  }
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfoErrorBoundary>
          <PokemonInfo pokemonName={pokemonName} />
        </PokemonInfoErrorBoundary>
      </div>
    </div>
  )
}

export default App
