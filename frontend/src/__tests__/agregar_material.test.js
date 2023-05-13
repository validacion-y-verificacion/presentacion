import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Agregar_material from "../components/agregar_material";
import Inicio from "../components/inicio";
import "@testing-library/jest-dom/extend-expect";

describe("Agregar Material Component", () => {
    test("submits the form and redirects after successful submission", async () => {
        // Set the user type in local storage
        localStorage.setItem("TipoUsuario", "Administrador");
        localStorage.setItem("token", "token");

        const mockBooks = {
            message: "Resources found",
            resources: [
                [1, "Book 1", "Author 1", "Editorial 1", 2021, "Description 1", "Disponible"],
                [2, "Book 2", "Author 2", "Editorial 2", 2022, "Description 2", "Disponible"],
                [3, "Book Title", "Author Name", "Editorial Name", 2020, "Description", "Disponible"],
            ],
        };

        global.fetch = jest.fn().mockImplementationOnce(() =>
            Promise.resolve({
                json: () => Promise.resolve({}),
            })
        );


        // Render the component
        render(<Agregar_material />);

        // Fill in the form inputs
        fireEvent.change(screen.getByLabelText("Titulo"), {
            target: { value: "Book Title" },
        });
        fireEvent.change(screen.getByLabelText("Autor"), {
            target: { value: "Author Name" },
        });
        fireEvent.change(screen.getByLabelText("Editorial"), {
            target: { value: "Editorial Name" },
        });
        fireEvent.change(screen.getByLabelText("Año"), {
            target: { value: parseInt("2020") }, // Convert to integer
        });
        fireEvent.change(screen.getByLabelText("Descripcion"), {
            target: { value: "Description" },
        });
        fireEvent.change(screen.getByLabelText("Estado"), {
            target: { value: "Disponible" },
        });

        // Submit the form
        fireEvent.click(screen.getByRole("button", { name: "Ingresar" }));

        // Verify that fetch was called with the correct parameters
        expect(fetch).toHaveBeenCalledWith("http://127.0.0.1:5000/new-book", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                titulo: "Book Title",
                autor: "Author Name",
                editorial: "Editorial Name",
                anio: "2020",
                descripcion: "Description",
                estado: "Disponible",
                token: "token",
            }),
        });

        // Render the component to display the list of books
        global.fetch.mockRestore();

        global.fetch = jest.fn().mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce(mockBooks),
        });

        render(<Inicio />);

        const input = screen.getByTestId("books-input");
        const submitButton = screen.getByRole("button", { name: /Buscar/i });

        // Enter token in the input field
        userEvent.type(input, "Book Title");

        // Click on the submit button
        fireEvent.click(submitButton);

        // Wait for the table to be added to the DOM.
        //Buscar include en backend
        //
        await waitFor(() => expect(screen.getByRole("table")).toBeInTheDocument());

        // Verify that the books are displayed
        const book = screen.getByText("Book Title");

        expect(book).toBeInTheDocument();
        global.fetch.mockRestore();
    });
});