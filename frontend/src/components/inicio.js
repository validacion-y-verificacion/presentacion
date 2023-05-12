import React, { useState } from "react";
import { Link} from "wouter";

async function get_books(payload){
    return fetch("http://127.0.0.1:5000/get-all-books", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify( payload ),
    }).then((data)=>data.json())
  };

export default function Inicio( ) {

    const [todos, setTodos] = useState();
    const [filter, setFilter] = useState("")
    const [value, setValue] = useState("")
    let token = localStorage.getItem("token");

    const handleSubmit = async (e) => {
        e.preventDefault();
        let payload = {
          filter: filter,
          value: value,
          token: token
        };

        get_books(payload).then(todos => setTodos(todos));
        }
      
    return (
      <div class="card text-center">
        <div class="card-header">
          <center>
            <h3 style={{ fontWeight: 1000}}>Bienvenido</h3>
          </center>

          <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center' }}>
            <input type="text" class="form-control" id="books" data-testid="books-input" onChange={(e) => setValue(e.target.value)}/> 
            <select id="filter" onChange={(e) => setFilter(e.target.value)}>
              <option value="todo">Sin filtro</option>
              <option value="titulo">Titulo</option>
              <option value="autor">Autor</option>
              <option value="editorial">Editorial</option>
            </select> 
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
                  const auxval = `/material-estudio/${todo[0]}`;
                  return (
                    <tr>
                      <td> {todo[1]} </td>
                      <td> {todo[2]} </td>
                      <td> {todo[5]} </td>
                      <td>
                        <Link to={auxval}>
                            <button class="btn btn-primary">
                            {" "}
                            Ingresar
                            </button>
                        </Link>
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