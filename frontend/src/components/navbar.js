import React from "react";

function delete_token(token) {
  return fetch("http://127.0.0.1:5000/delete-token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ "token": token}),
  }).then((data) => data.json())
};

export default function NavBar() {

    let mostrar = false
    
    let tipoUsuario = localStorage.getItem("TipoUsuario");
    if (tipoUsuario.localeCompare("Administrador") === 0) {
      mostrar = true
    }
    return (
      <nav className="navbar navbar-expand-lg navbar-light shadow-sm p-3 bg-body rounded">
        <div className="container-fluid">
          <a className="navbar-brand" href="/"> USAL </a>
          <button className="navbar-toggler" type="button"
            data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/"> Inicio </a>
                </li>
  
                <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/"> Perfil </a>
                </li>

                <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/mis-prestamos"> Mis prestamos </a>
                </li>
  
            {mostrar ? (
                <li className="nav-item">
                    <a className="nav-link" href="/agregar-material"> Nuevo material </a>
                </li>) : ("")
            }

            {mostrar ? (
                <li className="nav-item">
                    <a className="nav-link" href="/lista_usuarios"> Retorno de material </a>
                </li>) : ("")
            }
            </ul>
        </div>

        </div>
            <ul class="navbar-nav justify-content-end">
                <li className="nav-item ">
                    <a className="nav-link" href="/" onClick={() => {
                    const response = delete_token( localStorage.getItem("token") );
                    //console.log(response)
                    localStorage.clear();
                    window.location.reload();
                    }} >
                    Cerrar sesion
                </a>
              </li>
            </ul>
      </nav>
    );
  }
  