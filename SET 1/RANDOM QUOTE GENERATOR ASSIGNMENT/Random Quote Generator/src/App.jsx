import { useState } from 'react'
import QuoteGenerator from './components/QuoteGenerator'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        < QuoteGenerator />
      </div>
        
    </>
  )
}

export default App
