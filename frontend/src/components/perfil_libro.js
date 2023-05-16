import React, { useEffect, useState } from "react";
import { Redirect, Link } from "wouter";

async function get_perfil_libro(token, id_material) {
  return fetch("http://127.0.0.1:5000/get-book", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ "token": token, "id_material": id_material }),
  }).then((data) => data.json())
};

async function delete_material(token, id_material) {
  return fetch("http://127.0.0.1:5000/delete-book", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ "token": token, "index": id_material }),
  }).then((data) => data.json())
};

export default function Perfil_libro({ params }) {
  const [todos, setTodos] = useState();
  const id_material = params.keyword;
  let token = localStorage.getItem("token");
  let mostrar = false
  const auxval = `/editar-material/${id_material}`;
  const [eliminado, setEliminado] = useState(false);

  let tipoUsuario = localStorage.getItem("TipoUsuario");
  if (tipoUsuario.localeCompare("Administrador") === 0) {
    mostrar = true
  }

  useEffect(
    function () {
      get_perfil_libro(token, id_material).then((todos) => setTodos(todos));
    },
    [id_material, token]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await delete_material(token, id_material);
    setEliminado(true);
  };
  
  if (eliminado) {
    return <Redirect to={"/"} />;
  }

  return (
    <div class="card text-center">
      <div>
        {!todos ? (
          <div>
            Cargando informacion
          </div>
        ) : (<table className="table">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Descripción</th>
              <th scope="col">Estado consulta</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {todos.resources.map((libro) => (
              <tr key={libro.id}>
                <td>
                  {libro.nombre ? (
                    <div>
                      {libro.nombre}
                    </div>
                  ):(
                    <div>
                      {libro[1]}
                    </div>)}
                </td>
                <td>
                  {libro.fecha_consulta ? (
                    <div>
                      {libro.fecha_consulta}
                    </div>
                  ):(
                    <div>
                      {libro[5]}
                    </div>)}
                </td>
                <td>
                  {libro.estado_consulta ? (
                    <div>
                      {libro.estado_consulta}
                    </div>
                  ):(
                    <div>
                      {libro[6]}
                    </div>)}
                </td>
                <td>
                  {libro.acciones ? (
                    <div>
                      {libro.acciones}
                    </div>
                  ):(
                    <div>
                    </div>)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>)}
      </div>

      {mostrar ? (
        <div>
          <form onSubmit={handleSubmit}>
            <button type="submit" className="btn btn-primary">Eliminar</button>
          </form>
          <Link to={auxval}>
            <button class="btn btn-primary">
              {" "}
              Editar
            </button>
          </Link>
        </div>) : (
        <div></div>
      )}
    </div>
  );
}