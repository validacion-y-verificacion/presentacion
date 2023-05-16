import React, { useState, useEffect } from "react";
import { Redirect, useLocation, } from "wouter";

async function post_nuevo_material(credential) {
  return fetch("http://127.0.0.1:5000/new-book", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credential),
  }).then((data) => data.json())
};

export default function Agregar_material() {
  let token = localStorage.getItem("token");
  let tipo = localStorage.getItem("TipoUsuario");
  const [location, setLocation] = useLocation();

  const [titulo, setTitulo] = useState("")
  const [autor, setAutor] = useState("")
  const [editorial, setEditorial] = useState("")
  const [anio, setAnio] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [estado, setEstado] = useState("")

  if (tipo !== "Administrador") {
    ;
  }

  useEffect(() => {
    if (location === "/submitted") {
      setLocation("/");
    }
  }, [location, setLocation])

  const handleSubmit = async (e) => {
    e.preventDefault();
    let payload = {
      titulo: titulo,
      autor: autor,
      editorial: editorial,
      anio: anio,
      descripcion: descripcion,
      estado: estado,
      token: token
    };
    const response = await post_nuevo_material(payload); 
    setLocation("/")

  };

  return (
    <div class="card-body">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="titulo" class="form-label">
            Titulo
          </label>
          <input id="titulo" type="titulo" class="form-control" onChange={(e) => setTitulo(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="autor" class="form-label">
            Autor
          </label>
          <input id="autor" type="autor" class="form-control" onChange={(e) => setAutor(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="editorial" class="form-label">
            Editorial
          </label>
          <input id="editorial" type="editorial" class="form-control" onChange={(e) => setEditorial(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="año" class="form-label">
            Año
          </label>
          <input id="año" type="anio" class="form-control" onChange={(e) => setAnio(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="descripcion" class="form-label">
            Descripcion
          </label>
          <input id="descripcion" type="descripcion" class="form-control" onChange={(e) => setDescripcion(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="estado" class="form-label">
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
    </div>
  );
}