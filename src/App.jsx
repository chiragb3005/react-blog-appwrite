import { useState } from 'react'
import './App.css'
import conf from './config/config'

function App() {

  const [loading, setLoading] = useState(true)

  console.log(conf.appwriteUrl)

  return (
    <>
      <h1 className='text-center text-5xl text-red-600'>A blog site with core react and some other libraries</h1>
    </>
  )
}

export default App
