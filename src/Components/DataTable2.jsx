import React from 'react'
import { Link } from 'react-router-dom';
import '../App.css'
import "../style.css"


export default function DataTable(props) {

const linkSubmit = (e) => {
    e.preventDefault();
    var arr = String(e.target).split("http");
    //alert ("http" + arr[arr.length - 1]);
    window.location.href = "http" + arr[arr.length - 1];
}
    
/*const collapse = (id, e2) => {
    //if (e2.link2 === '' && e2.facebook_link1 === '' && e2.facebook_link2 === '' && e2.linkedIn_link === '' && e2.instagram_link === '') return;

    var dataElement = document.getElementById ("#collapse" + id)
    if (dataElement.getElementsByTagName('*').length === 0) return
    
    var glyphiconElement = document.getElementById ("#glyphicon" + id)

    if (dataElement.style.display === 'block') {
        dataElement.style.display = 'none';
        glyphiconElement.classList.remove ("glyphicon-chevron-down");
        glyphiconElement.classList.add ("glyphicon-chevron-left");
    }
    
    else {
        dataElement.style.display = "block"
        glyphiconElement.classList.remove ("glyphicon-chevron-left");
        glyphiconElement.classList.add ("glyphicon-chevron-down");
    }
}*/

return (
    <div className="list-group"  id="list2">
    {
        props.data.links.map ((e1, i) => {
            return <div key={i} className="text-right"> 
            <Link to="#" className="list-group-item active text-center" 
            style = {{ fontWeight: "lighter", margin: '0', padding: '1px 0 1px 0', borderRadius: '0'}} onClick={ e => e.preventDefault()}>
            <h4 style={{ marginLeft: "1%", marginRight: "1%"}}>{ e1.cat }</h4></Link>
            {
                props.soryByAtrr(e1.links).map ((e2, j) => {
                  return  <Link to="#" key={"j"+i+""+j} className="list-group-item text-right links" 
                  onClick={e => e.preventDefault()}>

                    { props.AdjustNum(j) + ". "}<Link onClick={e => linkSubmit(e)} to={e2.link}>{e2.site_name}</Link>  

                        { (e2.link2.trim() !== '')? 
                        <Link className="text-right" to={e2.link2} onClick={e => linkSubmit(e)}>קישור 2</Link> 
                        : ''}


                        { (e2.facebook_link1.trim() !== '') ? 
                        <Link className="text-right" to={e2.facebook_link1} onClick={e => linkSubmit(e)}>דף פייסבוק</Link>
                        : '' }

                        { (e2.facebook_link2.trim() !== '') ? 
                        <Link className="text-right" to={e2.facebook_link2} onClick={e => linkSubmit(e)}>דף פייסבוק2</Link>
                        : '' }

                        { (e2.linkedIn_link.trim() !== '') ? 
                        <Link className="text-right" to={e2.linkedIn_link} onClick={e => linkSubmit(e)}>לינקדאין</Link>
                        : ''}

                        { (e2.instagram_link !== undefined && e2.instagram_link.trim() !== '') ? 
                        <Link className="text-right" to={e2.instagram_link} onClick={e => linkSubmit(e)}>דף אינסטגרם</Link>
                        : '' }

                        { (e2.whatsapp.trim() !== '') ? <Link className="text-right" to="#"
                        onClick={e => e.preventDefault()}>
                        { e2.whatsapp }
                        </Link> : ''}                   

                    </Link>
                })
            }
            </div>
        })

    }
    </div>
    )
}
