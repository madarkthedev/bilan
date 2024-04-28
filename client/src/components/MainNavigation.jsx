import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../services/authService";

function MainNavigation({ user }) {
  const navigate = useNavigate()
  return (
    <nav className="navbar navbar-expand  py-2 mb-1 navbar navbar-dark bg-primary">
      <div className="container-fluid background-black">
        <NavLink className="navbar-brand" to="/">BARRAGES</NavLink>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><NavLink to="/root/smba" className="nav-link"> SMBA</NavLink></li>
            <li className="nav-item"><NavLink to="/root/tamesna" className="nav-link">TAMESNA</NavLink></li>
            <li className="nav-item"><NavLink to="/root/tkg" className="nav-link">CTKG</NavLink></li>
            <li className="nav-item"><NavLink to="/root/maser" className="nav-link">MASER</NavLink></li>
            <li className="nav-item"><NavLink to="/root/tiddas" className="nav-link">TIDDAS</NavLink></li>
            <li className="nav-item"><NavLink to="/root/elmaleh" className="nav-link">EL MALEH</NavLink></li>
            <li className="nav-item"><NavLink to="/root/users" className="nav-link"> USERS </NavLink></li>
            <li className="nav-item"><NavLink to="/root/minmax" className="nav-link"> MINMAX</NavLink></li>
          </ul>
          <div className="d-flex align-items-center">

          <div className="d-flex align-items-center">
              <span className="me-2">Welcome, {user?.username}</span>

            </div>


            <button className="btn btn-sm btn-success mx-1" onClick={() => {
logout()
            navigate('/')


            }}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default MainNavigation;
