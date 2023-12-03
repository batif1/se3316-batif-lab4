import {BrowserRouter,Routes,Route} from 'react-router-dom'

//pages and compenents
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Signup from './pages/Signup.js';
import Navbar from './components/Navbar';
import Unauth from './pages/Unauth.js';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <div className ="pages">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/Unauth" element={<Unauth/>}/>
        </Routes>
      </div>
      </BrowserRouter>
</div>
  );
}

export default App;
