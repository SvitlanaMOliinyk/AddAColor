import {useState} from 'react'


function Counter() {
    const [count, setCount] = useState<number>(1)
  return (
    <main className="home content">
    
    <h1>Count is {count}</h1>
    <button onClick={() => setCount(prev => prev + 1)}>+</button>
    <button onClick={() => setCount(prev => prev - 1)}>-</button>
    </main>
  )
}
export default Counter