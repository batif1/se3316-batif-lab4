import {BrowserRouter,Routes,Route} from 'react-router-dom'

//pages and compenents
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Signup from './pages/Signup.js';
import Navbar from './components/Navbar';
import HeroDashboard from './components/HeroDashboard.js'
import Admin from './pages/Admin.js'
import ContentPage from './pages/Info.js';

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
          <Route path="/HeroDashboard" element={<HeroDashboard/>}/>
          <Route path="/Admin" element={<Admin/>}/>
          <Route path="/Info" element={<ContentPage/>}/>
        </Routes>
      </div>
      </BrowserRouter>
</div>
  );
}

export default App;
