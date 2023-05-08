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
    
    useEffect(() => {
      get_prestamos(token, id_usuario).then((todos) => setTodos(todos));
    }, []);

    return (
      <div class="card text-center">
        <div class="card-header">
          <center>
            <h3 style={{ fontWeight: 1000}}>Mis prestamos</h3>
          </center>
        </div>

        <div>
        {!todos ? (
          <div>
            Cargando informacion
          </div>
        ):(<table class="table">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Fecha consulta</th>
                <th scope="col">Estado consulta</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {todos.resources.map((todo) => {
                return (
                  <tr>
                    <td> {todo[0]} </td>
                    <td> {todo[1]} </td>
                    <td> {todo[2]} </td>
                    <td> {todo[3]} </td>
                  </tr>
                )
              })}
            </tbody>
          </table>)}
        </div>
      </div>
    );
  }