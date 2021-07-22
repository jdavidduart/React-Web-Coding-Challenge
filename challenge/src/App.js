import './App.css';
import { Route } from "react-router-dom";
import Home from './Components/Home/Home';
import TheftDetail from './Components/TheftDetail/TheftDetail';
import Header from './Components/Header/Header';

function App() {
  return (
    <div className="App">
      <Route
        path='/'
        component={Header} 
      />
      <Route
        exact path='/'
        component={Home} 
      />
      <Route
        exact path='/:id'
        component={TheftDetail} 
      />
    </div>
  );
}

export default App;
