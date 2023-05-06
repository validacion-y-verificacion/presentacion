import React, { useEffect, useState } from "react";

function get_prestamos(token, id_usuario){
    return fetch("http://127.0.0.1:5000/chronology-usuario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify( {"token": token, "id_usuario": id_usuario} ),
    }).then((data)=>data.json())
  };

export default function Mis_prestamos( ) {
    const [todos, setTodos] = useState();

    let id_usuario = localStorage.getItem("IdUsuario");
    let token = localStorage.getItem("token");

    const handleSubmit = async (e) => {
        e.preventDefault();
        get_prestamos(token, id_usuario).then(todos => setTodos(todos));
        }

    console.log(todos)
    return (
      <div class="card text-center">
        <div class="card-header">
          <center>
            <h3 style={{ fontWeight: 1000}}>Mis prestamos</h3>
          </center>
          <form onSubmit={handleSubmit}>
            <button type="submit" className="btn btn-primary">
                Buscar
            </button>
          </form>
        </div>

        <div>
            <table class="table">
                <thead class="thead-dark">
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
      </div>
    );
  }