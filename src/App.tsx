import React, { useState } from 'react'
import Tiptap from './Tiptap'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Tiptap />
    </div>
  )
}

export default App
