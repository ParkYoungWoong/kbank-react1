import { useState } from 'react'
import { produce } from 'immer'

export default function App() {
  const [state, setState] = useState({
    user: {
      profile: {
        name: 'Neo',
        age: 22
      }
    },
    settings: {
      theme: 'dark'
    }
  })

  const updateProfileName = (name: string) => {
    const newState = produce(state, function (draft) {
      draft.user.profile.name = name
    })
    console.log(newState.user.profile === state.user.profile) // false
    console.log(newState.settings.theme === state.settings.theme) // true
    setState(newState)
  }

  return (
    <>
      <h1>{state.user.profile.name}</h1>
      <button onClick={() => updateProfileName('Lewis')}>Change Name</button>
    </>
  )
}
