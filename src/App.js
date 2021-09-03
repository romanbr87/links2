import './App.css'
import "./style.css"
import {BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
//import { createBrowserHistory } from "history";
import Home from './Components/Home.jsx'
import Home1 from './Components/Home1.jsx'
import About from './Components/About.jsx'

export default function App(props) {
  
  /*const history = createBrowserHistory();
  <Router forceRefresh={false} basename={process.env.PUBLIC_URL} history={history}>
  <Route render = {({ location }) => (
  <Switch location = { location }>
    <Route exact path='/' component={()=>{return <Home1 />}}/>
    <Route exact path='/1' component={()=>{return <Home />}}/>
    <Route exact path='/About' component={()=>{return <About />}}/>
    <Route exact path={process.env.PUBLIC_URL} status={404}><Redirect to="*" /></Route>
    <Route exact path='*' component={()=>{return <p>Null</p> }} status={404}/>
  </Switch>
  )} />
</Router>*/

  return (
      <Router forceRefresh={false} basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path='/' component={()=>{return <Home1 />}}/>
          <Route exact path='/1' component={()=>{return <Home />}}/>
          <Route exact path='/About' component={()=>{return <About />}}/>
          <Route exact path={process.env.PUBLIC_URL} status={404}><Redirect to="*" /></Route>
          <Route exact path='*' component={()=>{return <p>Null</p> }} status={404}/>
        </Switch>
      </Router>
  )
}


