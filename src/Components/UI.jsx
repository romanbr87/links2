import '../App.css'
import "../style.css"

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import DataTable from "./DataTable";

export default function UI(props) {
  const [data, setData] = useState() 
  const [index, setIndex] = useState (0)
  const [search, setSearch] = useState()
  const [searchText, setsearchText] = useState("")

  useEffect(() => {
    setData (props.data)
  }, [props])

  const AdjustNum = (num) => {
     num++;
     return (num < 10) ? "0" + num : num
  }

  const soryByAtrr = (arr) => {
    return arr = arr.sort((a, b) => {
        let res = a["site_name"].localeCompare(b["site_name"])
            return res;
    })
  }

  const setTable = (e) => {
    e.preventDefault();
    setIndex(e.target.getAttribute('a-key'));
  }


  const getLinksLength = (links) => {
    return links.reduce ((a, c) => {
        return a + c.links.length;
    }, 0)
  }

  const handleSubmit = (e) => {
    if (e.key !== undefined) {
      alert(e.key.toLowerCase());
      if ((e.key.toLowerCase() !== "enter")) return;
    }

    var txt = document.getElementById ("searchText").value;
    if (txt.trim() === "") return;

    var arr = data.reduce((a1, c1) => {
      return [...a1, ...c1.links.reduce((a2, c2) => {
        var subArr = c2.links.filter (e => {
          return e.site_name.toLowerCase().includes(txt.toLowerCase());
        })
        
        if (subArr.length > 0) return [...a2, {cat: c2.cat, links: subArr}]
        else return [...a2]

      }, [])

    ]}, [])

    
    setIndex (-1);
    setsearchText(document.getElementById ("searchText").value)
    setSearch ({links: arr});
    
  }

  if (data == null || data === "") return <p>Null</p>

  return (
    <React.Fragment>
    <nav className="navbar navbar-inverse navbar-fixed-top" style={{ textAlign: 'left' }}>
      <div className="container-fluid pull-right">
        <div className="nav-item">
          <Link to="/1">אודות</Link>
          <br/>
          <Link to="/About">אודות</Link>
        </div>
      </div>
    </nav>
          
    <div className="container text-center" dir='rtl'>
      <div className="jumbotron text-right" style={{ padding: '2em 0 0 0', borderRadius: '0'}}>
        <h1 id="title" style={{ paddingBottom: ".1em", textAlign: 'center', textDecoration: 'underline', backgroundColor: "white"  }}>אינדקס מקומות תעסוקה</h1>
        <p className="text-right">
        { data.reduce((acc,element) => acc + getLinksLength(element.links), 0) } אתרים 
        </p>

        <div className="row"><div className="col-lg-8 col-lg-offset-2 col-xs-10 col-xs-offset-1">
        <p className="text">
        ברוכים הבאים לאתר הפיילוט של אינדקס מקומות התעסוקה וחברות כוח האדם הגדול ביותר בארץ. 
כאן תוכלו למצאו ולהיחשף לרוב רוב מקומות התעסוקה המוכרים במשק הישראלי כמו גם חברות כוח אדם וגורמים נוספים בתחום התעסוקה. אתר נמצא בבנייה, בסופו תוכלו לקבל את המאגר בצורה מקוטלגת באופן מקצועי
        </p></div></div>
      </div>

      <div className="form-group input-group input-group-sm" id="searchForm" style={{ direction: "ltr" }} >
        <span className="input-group-btn">
          <button className="btn btn-default text-left" type="button" onClick={e => handleSubmit(e)}>
          <i className="glyphicon glyphicon-search"></i></button>
        </span>
        <input type="text" className="form-control" onKeyUp={ e => handleSubmit(e) }
        placeholder="חיפוש" name="searchText" id="searchText" />
      </div>

      { (index !== -2) ? '':
      <div className="list-group text-right">
      <Link to="#" className="list-group-item active">
        <span className="badge text-left" style={{ float: 'left'}}>{ data.reduce((acc,element) => acc + getLinksLength(element.links), 0) }</span>
        קטגוריות אתרים
      </Link>

      {
        data.map ((e, i) => {
          return (<Link className="list-group-item" to="#" key={i} a-key={i} onClick={ event => setTable(event) }>
            <span className="badge" style={{ float: 'left'}} a-key={i} onClick={ event => setTable(event) }>{ getLinksLength(e.links) }</span>
            {AdjustNum (i) + ". " + e.name}
          </Link>) 
        })
      }
      </div>
      }

      <select className="form-control" id="sel" onChange={ e => setIndex(e.target.value) } >
          {
            data.map ((e, i) => {
              return <option key={i+1} value={i}>{AdjustNum(i) + ". " + e.name + " - " + getLinksLength(e.links) + " קישורים" }</option> 
            })
          }
      </select>

      <div className="panel panel-info" style={{ marginTop: "1%" }}>
        <div className="panel-heading"><h3 style = {{ fontWeight: 'bolder', margin: '0', padding: '0.25em 0 0.25em 0'}}>
        { (index !== -1) ? data[index].name: "חיפוש: " + searchText } </h3></div>
        <table className="panel-body table table-bordered table-striped table-hover table-condensed text-center" id="testTable">
          <thead>
            <tr style={{backgroundColor: "yellow" }}>
              <th className="numberCell">#</th>
              <th className="nameCell">שם</th>
              <th>קישור 2</th>
              <th>דף פייסבוק</th>
              <th>2דף פייסבוק</th>
              <th>לינקדאין</th>
            </tr>
          </thead>
            {
              (index === -1) ?  
              <DataTable AdjustNum={AdjustNum} soryByAtrr={soryByAtrr} data={search}></DataTable>:
              <DataTable AdjustNum={AdjustNum} soryByAtrr={soryByAtrr} data={data[index]}></DataTable>              
            }
        </table>
      </div>

    </div>
    
    </React.Fragment>

  )
}
  