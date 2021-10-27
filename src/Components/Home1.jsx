import '../App.css'
import "../style.css"

import { useState, useEffect } from 'react'
import UI from "./UI"
import data1 from '../JSON/db2.json';

export default function Home1() {
  const [data, setData] = useState()

  useEffect(() => {
    setData (data1.job)
  }, [])

  if (data == null || data === "" || data === undefined) return <p>Null</p>
  return (
      <UI data={data}></UI>
  )
}
  