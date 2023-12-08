import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'


const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  console.log('User:', user); // Add this line to log the user object

  const handleClick = () => {
    logout()
  }

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Superhero Search</h1>
        </Link>
        <nav>
          {user && (
            <div>
              <span>{user.email.sl}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
          {user && user.email.split('@')[0] === 'admin' &&(
            <div>
              <Link to="/admin">You are an Admin.</Link>
            </div>
          )}
          <Link to="/Info"> DMCA, Privacy, and AUP</Link>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
