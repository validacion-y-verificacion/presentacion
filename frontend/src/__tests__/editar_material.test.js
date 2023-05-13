import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Editar_libro from "../components/editar_material";

describe("Editar_libro", () => {
    beforeEach(() => {
        // Simular fetch
        global.fetch = jest.fn().mockResolvedValue({
            json: () =>
                Promise.resolve({
                    message: "Libro obtenido correctamente",
                    resources: [
                        {
                            id: 1,
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
    });

    afterEach(() => {
        // Restaurar fetch después de cada prueba
        global.fetch.mockRestore();
    });

    test("debería editar un libro correctamente", async () => {
        localStorage.setItem("TipoUsuario", "Administrador");
        localStorage.setItem("token", "token");
      
        render(<Editar_libro params={{ keyword: 1 }} />);
      
        // Espera a que se muestre el formulario completo
        await screen.findByLabelText("Titulo");
        await screen.findByLabelText("Autor");
        await screen.findByLabelText("Editorial");
        await screen.findByLabelText("Año");
        await screen.findByLabelText("Descripcion");
        await screen.findByLabelText("Estado");
      
        // Ingresa nuevos valores en los campos del formulario
        fireEvent.change(screen.getByLabelText("Titulo"), { target: { value: "Nuevo título" } });
        fireEvent.change(screen.getByLabelText("Autor"), { target: { value: "Nuevo autor" } });
        fireEvent.change(screen.getByLabelText("Editorial"), { target: { value: "Nueva editorial" } });
        fireEvent.change(screen.getByLabelText("Año"), { target: { value: "2023" } });
        fireEvent.change(screen.getByLabelText("Descripcion"), { target: { value: "Nueva descripción" } });
        fireEvent.change(screen.getByLabelText("Estado"), { target: { value: "Reservado" } });
      
        // Envía el formulario
        fireEvent.click(screen.getByRole("button", { name: "Ingresar" }));
      
        // Verifica que se haya llamado a la función de fetch con los parámetros correctos
        expect(fetch).toHaveBeenCalledWith("http://127.0.0.1:5000/get-book", expect.objectContaining({
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: "token",
            id_material: 1,
          }),
        }));
      
        // Verifica que se haya llamado a la función de fetch para la edición del material
        expect(fetch).toHaveBeenCalledWith("http://127.0.0.1:5000/update-book", expect.objectContaining({
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_material: 1,
            titulo: "Nuevo título",
            autor: "Nuevo autor",
            editorial: "Nueva editorial",
            anio: "2023",
            descripcion: "Nueva descripción",
            estado: "Reservado",
            token: "token",
          }),
        }));
      });
      
});