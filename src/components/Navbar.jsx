import React from 'react'
import logo from "../assets/Logo.svg"
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

function Navbar(props) {
  let isLoggedIn=props.isLoggedIn
  let setLoggedIn=props.setLoggedIn

  return (
    <div className='flex justify-evenly'>
      <Link to="/"><img src={logo} alt="logo" width={160} height={32} loading='lazy' /></Link>
      <nav>
        <ul className='flex ml-2 gap-3'>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">About</Link>
          </li>
          <li>
            <Link to="/">Contact</Link>
          </li>
        </ul>
      </nav>
      {/* login-signin-logout-dashboard */}
      <div className='flex ml-3 gap-3'>
        { !isLoggedIn &&
          <Link to="/signup"><button>Sign up</button></Link>
        }
        { !isLoggedIn &&
          <Link to="/login"><button>Log in</button></Link>
        }
        { isLoggedIn &&
          <Link to="/">
            <button onClick={()=>{
              setLoggedIn(false)
              toast.success("Log out successfully")
              }}>
              Log out
            </button>
          </Link>
        }
        { isLoggedIn &&
          <Link to="/dashboard"><button>Dashboard</button></Link>
        }
      </div>
    </div>
  )
}

export default Navbar
