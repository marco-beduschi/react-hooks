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
  // 🐨 use React.useEffect where the callback should be called whenever the
  // pokemon name changes.
  // 💰 DON'T FORGET THE DEPENDENCIES ARRAY!
  // 💰 if the pokemonName is falsy (an empty string) then don't bother making the request (exit early).
  // 🐨 before calling `fetchPokemon`, make sure to update the loading state
  // 💰 Use the `fetchPokemon` function to fetch a pokemon by its name:
  //   fetchPokemon('Pikachu').then(
  //     pokemonData => { /* update all the state here */},
  //   )

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
      return (
        <div role="alert">
          There was an error:{' '}
          <pre style={{whiteSpace: 'normal'}}>{state.error.message}</pre>
        </div>
      )
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
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
