import React from "react";
import logo from "../../Assets/IMG/logo.jpeg";


function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
          
        <a className="navbar-brand" href="/">
          <img src={logo} alt="" width="30" height="30"/>
          
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Usuários
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/cargos">
                Cargos
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/perfis">
                Perfis
              </a>
            </li>
          </ul>
          <span className="navbar-text">Brian Messias</span>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
