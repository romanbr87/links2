import '../App.css'
import "../style.css"

import { useState, useEffect } from 'react'
import UI from "./UI"

export default function Home(props) {

  const [data, setData] = useState([])

  const getDataFromJson = () => {
    var fileName = "https://romanbr87.github.io/links/db2.json";
    fetch(fileName)
    .then(response => response.json())
    .then(data => {
      var jobs_data = data.job;
      setData (jobs_data);
      
      //var len = jobs_data.reduce((acc,element) => acc + element.links.length, 0)
      //let intro = document.getElement ('intro');   
      //intro.innerHTML = jobs_data.length + " categories " + len + " websites"
      //console.log (len);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
  
  useEffect(() => {
    getDataFromJson ();
  })

  if (data == null || data === "") return <p>Null</p>
  return (
      <UI data={data}></UI>
  )
}
  