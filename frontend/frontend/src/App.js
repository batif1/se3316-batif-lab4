import {BrowserRouter,Routes,Route} from 'react-router-dom'

//pages and compenents
import Home from './pages/Home.js'
import Login from './pages/Login.js';
import Signup from './pages/Signup.js';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <div className ="pages">
        <Routes>
          <Route path="/home" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
        </Routes>
      </div>
      </BrowserRouter>
</div>
  );
}

export default App;
