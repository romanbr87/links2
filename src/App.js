import './App.css'
import "./style.css"
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from "history";
import Home from './Components/Home.jsx'
import About from './Components/About.jsx'

export default function App(props) {
  
  const history = createBrowserHistory();

  return (
      <Router forceRefresh={false} history={history}>
        <Route render = {({ location }) => (
        <Switch location = { location }>
          <Route exact path='/' component={()=>{return <Home />}}/>
          <Route exact path='/About' component={()=>{return <About />}}/>
          <Route exact path='*' component={()=>{return <p>Null</p> }} status={404}/>
        </Switch>
        )} />
      </Router>
  )
}


