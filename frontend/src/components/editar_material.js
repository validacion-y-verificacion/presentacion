import React, { useEffect, useState } from "react";
import { Redirect, Link } from "wouter";


async function get_perfil_libro(token, id_material){
    return fetch("http://127.0.0.1:5000/get-book", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify( {"token": token, "id_material": id_material} ),
    }).then((data)=>data.json())
  };

async function editar_material(credential){
    return fetch("http://127.0.0.1:5000/update-book", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify( credential ),
    }).then((data)=>data.json())
  };


export default function Editar_libro( { params } ) {
    const [todos, setTodos] = useState();
    const id_material  = params.keyword;
    let token = localStorage.getItem("token");
    let mostrar = false

    let tipoUsuario = localStorage.getItem("TipoUsuario");
    if (tipoUsuario.localeCompare("Administrador") === 0) {
      mostrar = true
    }

    const [titulo, setTitulo] = useState("")
    const [autor, setAutor] = useState("")
    const [editorial, setEditorial] = useState("")
    const [anio, setAnio] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const [estado, setEstado] = useState("")

    useEffect(
        function() {
            get_perfil_libro(token, id_material).then(
                (todos) => setTodos(todos.resources));
        },
        [id_material, token]
      );

      const handleSubmit = async (e) => {
        e.preventDefault();
        let payload = {
            id_material: id_material,
            titulo: titulo,
            autor: autor,
            editorial: editorial,
            anio: anio,
            descripcion: descripcion,
            estado: estado,
            token: token
        };
        const response = await editar_material(payload);
        console.log(response)
        return <Redirect to={"/"} />;
      }

    return (
        <div class="card text-center">
            <div>
                {!todos ? (
                <div>
                Cargando informacion
                </div>
                ):(
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label class="form-label">
                                Titulo
                            </label>
                            <input type="text" class="form-control" defaultValue={todos[0][1]}  onChange={(e) => setTitulo(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label class="form-label">
                                Autor
                            </label>
                            <input type="text" class="form-control" defaultValue={todos[0][2]} onChange={(e) => setAutor(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label class="form-label">
                                Editorial
                            </label>
                            <input type="text" class="form-control" defaultValue={todos[0][3]} onChange={(e) => setEditorial(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label class="form-label">
                                Año
                            </label>
                            <input type="text" class="form-control" defaultValue={todos[0][4]} onChange={(e) => setAnio(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label class="form-label">
                                Descripcion
                            </label>
                            <input type="text" class="form-control" defaultValue={todos[0][5]} onChange={(e) => setDescripcion(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label class="form-label">
                                Estado
                            </label>
                            <select id="estado" onChange={(e) => setEstado(e.target.value)}>
                            <option value="Disponible">Disponible</option>
                            <option value="Reservado">Reservado</option>
                            <option value="Prestado">Prestado</option>
                            </select> 
                        </div>
                        <button type="submit" className="btn btn-primary">Ingresar</button>
                    </form>
                )}
            </div>
        </div>
    );

}