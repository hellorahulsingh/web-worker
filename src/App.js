import React from 'react'
import { useState } from "react"

const App = React.memo(() => {
  const [input1, setInput1] = useState()
  const [input2, setInput2] = useState()
  const [result, setResult] = useState()
  const [myWorker1, setMyWorker1] = useState()
  const [myWorker2, setMyWorker2] = useState()
  const [hasWorker1, setHasWorker1] = useState(false)
  const [hasWorker2, setHasWorker2] = useState(false)
  const [rv, setRv] = useState()
  const [showRandom, setShowRandom] = useState(false)


  const input1Handler = (e) => {
    setInput1(e.target.value)
  }
  const input2Handler = (e) => {
    setInput2(e.target.value)
  }
  const withWorker = (e) => {
    if(input1 && input2){
      const worker = !hasWorker1 ? new Worker('worker.js') : myWorker1
      setMyWorker1(worker)
      setHasWorker1(true)
      worker.postMessage([input1, input2])
      worker.onmessage = e => {
        if(e.data){
          setResult(e.data)
        }
      }
    }
  }

  const withOutWorker = (e) => {
    setResult(parseInt(input1) + parseInt(input2))
  }

  const wbHandler = e => {
    // const worker = typeof myWorker2 !== 'undefined' ? new Worker('randWorker.js') : myWorker2
    const worker = !hasWorker2 ? new Worker('randWorker.js') : myWorker2
    setMyWorker2(worker)
    setHasWorker2(true)
    worker.postMessage('do work')
    worker.onmessage = e => {
      if(e.data){
        setRv(e.data)
      }
    }
  }

  const handleRandom = e => {
    setShowRandom(<h5>Random number is {Math.random()} </h5>)
  }
  
  return (
    <>
      <div className="App">
        <header className="App-header">
          <title>React-Web-Worker</title>
        </header>
      </div>
      <div>
        <h3>Calculate Sum</h3>
        <div>
          Enter first integer
          <input type='number' onChange={input1Handler}/>
          Enter second integer
          <input type='number' onChange={input2Handler}/>
          <button onClick={withWorker}>With Worker</button>
          <button onClick={withOutWorker}>Without Worker</button>
          <p>
            Result {result}
          </p>
        </div>
        <p>
          <div>
            <button id='work-btn' onClick={wbHandler}>Click me</button>
            <button id='btn' onClick={handleRandom}>Get Random Number</button>
            <h1>Random</h1>
            {showRandom && showRandom}
            <strong>{rv ? rv : ''}</strong>
          </div>
        </p>
      </div>
    </>
  );
})

export default App;
