import '../App.css'
import "../style.css"
import { Link } from 'react-router-dom';

export default function DataTable(props) {

const handleSubmit = (e) => {
    e.preventDefault();
    var arr = String(e.target).split("https://")
   
    window.location.href = "https://" + arr[1];
}
    
return (
    <tbody id="dataTable">
    {
        props.data.links.map ((e1, i) => {
            return props.soryByAtrr(e1.links).map ((e2, j) => {
            return ([ 
                (j=== 0) ? 
                <tr className="borderCat"><td colSpan="100"><h4 className="cat">{ e1.cat }</h4></td></tr> : "",
      
                <tr key={j} className={ (j === 0) ? "borderTop": ''}> 
                    <td className="numberCell">{ props.AdjustNum(j)}</td>
                    <td className="nameCell">
                    { (e2.link !== '') ? <Link to={e2.link} onClick={e => handleSubmit(e) } >{e2.site_name}</Link> : e2.site_name }
                    </td>
                    <td>
                    { (e2.link2 !== '') ? <Link to={e2.link2} onClick={e => handleSubmit(e) } >קישור 2</Link> : 'קישור 2' }
                    </td>
                    <td>
                    { (e2.facebook_link1 !== '') ? <Link to={e2.facebook_link1} onClick={e => handleSubmit(e) } >דף פייסבוק</Link> : 'דף פייסבוק' }
                    </td>
                    <td>
                    { (e2.facebook_link2 !== '' && e2.facebook_link2 !== undefined) ? <Link to={e2.facebook_link2}
                     onClick={e => handleSubmit(e) }>דף פייסבוק 2</Link> : 'דף פייסבוק 2' }
                    </td>
                    <td>
                    { (e2.linkedIn_link !== '') ? <Link to={e2.linkedIn_link} onClick={e => handleSubmit(e) }>לינקדאין</Link> : 'לינקדאין' }
                    </td>

                </tr>
                ])
            })
        }) 
    }
    </tbody>

    )
}
