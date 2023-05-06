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
      </div>
    );
  }