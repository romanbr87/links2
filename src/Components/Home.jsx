import '../App.css'
import "../style.css"

import { useState, useEffect } from 'react'
import UI from "./UI"

export default function Home(props) {

  const [data, setData] = useState()

  const getDataFromJson = () => {
    var fileName = "https://romanbr87.github.io/links/db2.json";
    fetch(fileName)
    .then(response => response.json())
    .then(data => {
      var jobs_data = data.job;
      setData (jobs_data);
      
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
  
  useEffect(() => {
    getDataFromJson ();
  }, []);

  if (data == null || data === "" || data === undefined) return <p>Null</p>
  return (
      <UI data={data}></UI>
  )
}
  