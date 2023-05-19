import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Editar_libro from "../components/editar_material";
import { Router, Route } from 'wouter';

describe("Editar_libro", () => {
  test("debería editar un libro correctamente y redireccionar", async () => {
    localStorage.setItem("TipoUsuario", "Administrador");
    localStorage.setItem("token", "token");


    // Mock del fetch inicial al obtener el libro
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          message: "Libro obtenido correctamente",
          resources: [
            {
              id: 0,
              titulo: "Libro existente",
              autor: "Autor existente",
              editorial: "Editorial existente",
              anio: "2022",
              descripcion: "Descripción existente",
              estado: "Disponible",
            },
          ],
        }),
    });


    render(
      <Router>
        <Route path="/editar-material/:keyword" component={Editar_libro} />
      </Router>
    );
    //render(<Editar_libro params={{ keyword: 0 }} />);

    // Esperar a que se muestre el formulario completo
    await screen.findByLabelText("Titulo");
    await screen.findByLabelText("Autor");
    await screen.findByLabelText("Editorial");
    await screen.findByLabelText("Año");
    await screen.findByLabelText("Descripcion");
    await screen.findByLabelText("Estado");

    // Mock del fetch para la edición del libro
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          message: "Libro editado correctamente",
        }),
    });

    // Ingresa nuevos valores en los campos del formulario
    fireEvent.change(screen.getByLabelText("Titulo"), {
      target: { value: "Nuevo título" },
    });
    fireEvent.change(screen.getByLabelText("Autor"), {
      target: { value: "Nuevo autor" },
    });
    fireEvent.change(screen.getByLabelText("Editorial"), {
      target: { value: "Nueva editorial" },
    });
    fireEvent.change(screen.getByLabelText("Año"), {
      target: { value: "2023" },
    });
    fireEvent.change(screen.getByLabelText("Descripcion"), {
      target: { value: "Nueva descripción" },
    });
    fireEvent.change(screen.getByLabelText("Estado"), {
      target: { value: "Reservado" },
    });

    // Simular el envío del formulario
    fireEvent.submit(screen.getByRole("button", { name: "Ingresar" }));

    // Verificar que se haya llamado al fetch de edición del libro con los datos correctos
    expect(global.fetch).toHaveBeenCalledWith("http://127.0.0.1:5000/update-book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_material: 0,
        titulo: "Nuevo título",
        autor: "Nuevo autor",
        editorial: "Nueva editorial",
        anio: "2023",
        descripcion: "Nueva descripción",
        estado: "Reservado",
        token: "token",
      }),
    });

    // Verificar redireccionamiento
    expect(Redirect).toHaveBeenCalledWith({ to: "/" }, "{}");
  });
});
