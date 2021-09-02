import '../App.css'
import "../style.css"
import { useEffect } from 'react'

export default function SearchTable(props) {

useEffect(() => {
    console.log (props.data);
})

if (props.data.length == 0) return <tbody></tbody>
return (
    <tbody>
    {
        props.soryByAtrr(props.data).map ((e, i) => {
        return ['',    
        <tr key={i} className={ (i == 0) ? "borderTop": ''}> 
            <td className="numberCell">{ props.AdjustNum(i)}</td>
            <td className="nameCell">
            { (e.link != '') ? <a href={e.link} >{e.site_name}</a> : e.site_name }
            </td>
            <td>
            { (e.link2 != '') ? <a href={e.link2}>קישור 2</a> : 'קישור 2' }
            </td>
            <td>
            { (e.facebook_link1 != '') ? <a href={e.facebook_link1}>דף פייסבוק</a> : 'דף פייסבוק' }
            </td>
            <td>
            { (e.facebook_link2 != '' && e.facebook_link2 != undefined) ? <a href={e.facebook_link2}>דף פייסבוק 2</a> : 'דף פייסבוק 2' }
            </td>
            <td>
            { (e.linkedIn_link != '') ? <a href={e.linkedIn_link}>לינקדאין</a> : 'לינקדאין' }
            </td>

        </tr>
        ]
        })
    }
    </tbody>
  )
    
}
