import React, { useEffect, useState } from "react";

async function get_books(token){
    return fetch("http://127.0.0.1:5000/get-all-books", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({"token": token}),
    }).then((data)=>data.json())
  };

export default function Inicio( ) {

    const [todos, setTodos] = useState();
    let token = localStorage.getItem("token");

    const handleSubmit = async (e) => {
        e.preventDefault();
        get_books(token).then(todos => setTodos(todos));
        }
    
    console.log(todos)
    return (
      <div class="card text-center">
        <div class="card-header">
          <center>
            <h3 style={{ fontWeight: 1000}}>Bienvenido</h3>
          </center>

          <form onSubmit={handleSubmit}>
            <input type="text" class="form-control" id="books"/> 
            <button type="submit" class="btn btn-primary">
                Buscar
            </button>
          </form>
        </div>
        <div>
          {!todos ? (
            <div>

            </div>
            ):(<table class="table">
            <thead>
              <tr>
                <th scope="col">Titulo</th>
                <th scope="col">Autor</th>
                <th scope="col">Descripcion</th>
                <th scope="col">Ver detalles</th>
              </tr>
            </thead>
            <tbody>
              {todos.resources.map((todo) => {
                  return (
                    <tr>
                      <td> {todo[1]} </td>
                      <td> {todo[2]} </td>
                      <td> {todo[5]} </td>
                      <td>
                        <button type="submit" class="btn btn-primary">
                          Ver detalle
                        </button> 
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>)}
        </div>
      </div>
    );
  }