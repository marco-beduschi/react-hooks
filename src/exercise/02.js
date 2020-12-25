// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

// const useLocalStorageState = storageKey => {
//   const getKey = () => window.localStorage.getItem(storageKey) || ''
//   const [key, setKey] = React.useState(getKey())
//
//   React.useEffect(() => {
//     window.localStorage.setItem(storageKey, key)
//   }, [name])
// }

function Greeting({initialName = ''}) {
  const getName = () => window.localStorage.getItem('name') || initialName

  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') || initialName
  const [name, setName] = React.useState(getName)

  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem('name', name)
  React.useEffect(() => {
    window.localStorage.setItem('name', name)
  }, [name])

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
