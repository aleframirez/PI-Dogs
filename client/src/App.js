import './App.css';
import { Route, BrowserRouter } from "react-router-dom";
import Home from "./components/containers/Home"
import LandingPage from './components/dumbs/LandingPage';
import Details from './components/containers/Details';
import CreatedDog from './components/containers/CreatedDog';


function App() {
  return (
    <BrowserRouter>
      <div>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/breeds/detail/:id" component={Details}/>
        <Route exact path="/breeds/create" component={CreatedDog} />
        <Route exact path="/breeds" component={Home} />
      </div>
    </BrowserRouter>
  );
}
// Faltarian las rutas para los Detalle, una para Post,
export default App;
