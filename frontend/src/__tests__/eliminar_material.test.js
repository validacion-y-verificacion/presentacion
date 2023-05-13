import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Perfil_libro from "../components/perfil_libro";

describe("Perfil_libro", () => {
    beforeEach(() => {
        // Simular fetch para obtener el libro
        global.fetch = jest.fn().mockResolvedValueOnce({
            json: () =>
                Promise.resolve({
                    message: "Libro obtenido correctamente",
                    resources: [
                        {
                            id: 1,
                            nombre: "Libro existente",
                            fecha_consulta: "2022-05-09",
                            estado_consulta: "Disponible",
                            acciones: "Acciones del libro",
                        },
                    ],
                }),
        });

        // Simular fetch para eliminar el libro
        global.fetch.mockResolvedValueOnce({
            json: () =>
                Promise.resolve({
                    message: "Libro eliminado correctamente",
                }),
        });

        // Configurar el token en el almacenamiento local
        localStorage.setItem("token", "token");
    });

    afterEach(() => {
        // Restaurar fetch después de cada prueba
        global.fetch.mockRestore();
        // Limpiar el almacenamiento local
        localStorage.removeItem("token");
    });

    test("debería eliminar un libro existente correctamente", async () => {
        localStorage.setItem("TipoUsuario", "Administrador");

        render(<Perfil_libro params={{ keyword: 1 }} />);

        // Esperar a que se muestre la tabla
        await screen.findByRole("table");


        // Verificar que se muestre el nombre del libro en la tabla
        expect(screen.getByRole("cell", { name: "Libro existente" })).toBeInTheDocument();
        expect(screen.getByRole("cell", { name: "2022-05-09" })).toBeInTheDocument();
        expect(screen.getByRole("cell", { name: "Disponible" })).toBeInTheDocument();
        expect(screen.getByRole("cell", { name: "Acciones del libro" })).toBeInTheDocument();
    
        // Verificar que se haya llamado a la función de fetch para obtener el libro
        expect(fetch).toHaveBeenCalledWith(
            "http://127.0.0.1:5000/get-book",
            expect.objectContaining({
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token: "token",
                    id_material: 1,
                }),
            })
        );

        // Verificar que se muestre el botón de eliminar
        const eliminarButton = screen.getByRole("button", { name: "Eliminar" });
        expect(eliminarButton).toBeInTheDocument();

        // Simular clic en el botón de eliminar
        fireEvent.click(eliminarButton);

        // Verificar que se haya llamado a la función de fetch para eliminar el libro
        expect(fetch).toHaveBeenCalledWith(
            "http://127.0.0.1:5000/delete-book",
            expect.objectContaining({
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token: "token",
                    index: 1,
                }),
            })
        );
    });
});
