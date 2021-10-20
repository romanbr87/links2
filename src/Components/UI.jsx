import '../App.css'
import "../style.css"

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import DataTable from "./DataTable2";

export default function UI(props) {
  const [data, setData] = useState() 
  const [index, setIndex] = useState (0)
  const [searchData, setSearchData] = useState()
  const [searchText, setsearchText] = useState("")
  const [check1, setCheck1] = useState (false)
  const [location, setLocation] = useState ("")

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

  const SearchInData = (e) => {

    if (e.key !== undefined) {
      if ((e.key.toLowerCase() !== "enter")) return;
    }

    var txt = document.getElementById ("searchText").value;
    if (txt.trim() === "") return;

    var flags = "dug" + ((!check1) ? "i" : ''); 
    var regEx = new RegExp (txt, flags)

    var arr = data.reduce((a1, c1) => {
      return [...a1, ...c1.links.reduce((a2, c2) => {
        var subArr = c2.links.filter (e => {
          
          /*return (!check1) ? e.site_name.toLowerCase().includes(txt.toLowerCase()) :
                            e.site_name.includes(txt)*/
            
          if (location === '') return e.site_name.match (regEx)
          else return e.site_name.match (regEx) && e.location === location
        })
        
        if (subArr.length > 0) return [...a2, {cat: c2.cat, links: subArr}]
        else return [...a2]

      }, [])

    ]}, [])

    
    setIndex (-1);
    setsearchText(document.getElementById ("searchText").value)
    setSearchData ({links: arr});
  }

  if (data == null || data === "" || data === undefined) return <p>Null</p>
  return ([
    <div className="container text-center pull-center">
      <div className="panel" id="panelForm">
        
        <div className="panel-heading">
        <h3 id= "title" style = {{ fontWeight: "lighter", textDecoration: "underline" }}>קטלוג אתרים של מקומות תעסוקה וחברות כוח אדם</h3>
        <br style = {{padding: "0", margin: "0 0 14% 0"}} />
        <h4 className="text-right">{ data.reduce((acc,element) => acc + getLinksLength(element.links), 0) } רשומות  </h4>
        </div>
        
        <div className="panel-body text-center pull-right 
        col-lg-4 col-md-4 col-sm-12 col-xs-12">

        <div className="input-group input-group-sm" id="searchForm" style={{ direction: "ltr" }} >
          <span className="input-group-btn">
            <button className="btn btn-default text-left" type="button" onClick={e => SearchInData(e)}>
            <i className="glyphicon glyphicon-search"></i></button>
          </span>
          <input type="text" className="form-control" onKeyUp={ e => SearchInData(e) }
          placeholder="חיפוש" id="searchText" name="searchText"/>
        </div>
        <hr style = {{padding: "0", margin: "0 0 2% 0"}} />
        <div className="checkbox text-right" style={{marginTop: "2%"}}>
            <label for="inlineCheckbox1" className="checkbox-inline">
            <input type="checkbox" id="inlineCheckbox1" value="option1" 
            onChange={e=> setCheck1(e.target.checked)} />גודל אות</label>
        </div>      
        <div className="radio text-right" style={{margin: "2% auto 3% auto"}}>
            
            <label className="radio-inline">
            <input type="radio" name="inlineRadio" value=""
            onClick={e=> setLocation("")} />כל הארץ</label>

            <label className="radio-inline">
            <input type="radio" name="inlineRadio" value="north" 
            onClick={e=> setLocation("north")} />צפון</label>

            <label className="radio-inline">
            <input type="radio" name="inlineRadio" value="center" 
            onClick={e=> setLocation("center")} />מרכז</label>

            <label className="radio-inline">
            <input type="radio" name="inlineRadio" value="south" 
            onClick={e=> setLocation("south")} />דרום</label>
        </div>

        { (index !== -2) ? '':
        <div className="list-group text-right" id="list1">
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
        </div>
        </div>


      <div id="dataTable" className="col-lg-8 col-md-8 col-sm-12 col-xs-12 col-lg-offset-2 col-md-offset-2"
      style={{ marginTop: "2%"}}>
        <div className="panel panel-info" style={{border: "1px solid #bce8f1"}}>
          <div className="panel-heading">
          <h3 style = {{ fontWeight: "lighter", margin: '0', padding: '.5em 0 .5em 0'}}>
          { (index !== -1) ? data[index].name: (searchData.links.length !== 0) ? "חיפוש: " + searchText: "לא נמצאו רשומות עבור: " + searchText } </h3>
          </div>
          <div className="panel-body"></div>
          {
            (index === -1) ?  
            <DataTable AdjustNum={AdjustNum} soryByAtrr={soryByAtrr} data={searchData}></DataTable>:
            <DataTable AdjustNum={AdjustNum} soryByAtrr={soryByAtrr} data={data[index]}></DataTable>              
          }
        </div>
      </div>         
    </div>,
    
    <footer className="well well-sm panel-footer text-right navbar-fixed-bottom" 
    style={{ margin: "10em 0 0 0", borderRadius: '0', border: 'none', marginTop: "10em"}}>
        
        { data.reduce((acc,element) => acc + getLinksLength(element.links), 0) } רשומות
    </footer> 

  ])
}
  