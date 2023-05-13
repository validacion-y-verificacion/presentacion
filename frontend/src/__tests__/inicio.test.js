import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import Inicio from "../components/inicio";
import React from "react"

describe("Inicio Component", () => {
  test("renders Inicio component", () => {
    render(<Inicio />);
    const welcomeText = screen.getByText(/Bienvenido/i);
    expect(welcomeText).toBeInTheDocument();
  });

  test("fetches books and displays them", async () => {
    const mockBooks = {
      message: "Resources found",
      resources: [
        [1, "Book 1", "Author 1", "Editorial 1", 2021, "Description 1", "Disponible"],
        [2, "Book 2", "Author 2", "Editorial 2", 2022, "Description 2", "Disponible"],
      ],
    };
  
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockBooks),
    });
  
    render(<Inicio />);
  
    const input = screen.getByRole("textbox", { id: "books" });
    const submitButton = screen.getByRole("button", { name: /Buscar/i });
  
    // Enter token in the input field
    userEvent.type(input, "");
  
    // Click on the submit button
    fireEvent.click(submitButton);
  
    // Wait for the fetch call to be completed
    await screen.findByRole("table");
  
    // Verify that the books are displayed
    const book1 = screen.getByText("Book 1");
    const book2 = screen.getByText("Book 2");
  
    expect(book1).toBeInTheDocument();
    expect(book2).toBeInTheDocument();
  
    // Restore the original fetch function
    global.fetch.mockRestore();
  });
  
  test("fetches books, displays particular book", async () => {
    const mockBooks = {
      message: "Resources found",
      resources: [
        [1, "Book 1", "Author 1", "Editorial 1", 2021, "Description 1", "Disponible"],
        [2, "Book 2", "Author 2", "Editorial 2", 2022, "Description 2", "Disponible"],
      ],
    };
  
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockBooks),
    });
  
    render(<Inicio />);
  
    const input = screen.getByRole("textbox", { id: "books" });
    const submitButton = screen.getByRole("button", { name: /Buscar/i });
  
    // Enter token in the input field
    userEvent.type(input, "Book 1");
  
    // Click on the submit button
    fireEvent.click(submitButton);
  
    // Wait for the fetch call to be completed
    await screen.findByRole("table");
  
    // Verify that the books are displayed
    const book1 = screen.getByText("Book 1");
  
    expect(book1).toBeInTheDocument();
  
    // Restore the original fetch function
    global.fetch.mockRestore();
  });

  test("clicks on 'Ingresar' button for the first book and checks the link", async () => {
    const mockBooks = {
      message: "Resources found",
      resources: [
        [1, "Book 1", "Author 1", "Editorial 1", 2021, "Description 1", "Disponible"],
        [2, "Book 2", "Author 2", "Editorial 2", 2022, "Description 2", "Disponible"],
      ],
    };
  
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockBooks),
    });
  
    render(<Inicio />);
  
    const input = screen.getByRole("textbox", { id: "books" });
    const submitButton = screen.getByRole("button", { name: /Buscar/i });
  
    // Enter token in the input field
    userEvent.type(input, "");
  
    // Click on the submit button
    fireEvent.click(submitButton);
  
    // Wait for the fetch call to be completed
    await screen.findByRole("table");
  
    // Verify that the books are displayed
    const book1 = screen.getByText("Book 1");
  
    expect(book1).toBeInTheDocument();
  
    // Click on the 'Ingresar' button for the first book
    const ingresarButtons = screen.getAllByText("Ingresar");
    fireEvent.click(ingresarButtons[0]);
  
    // Check the current location after clicking 'Ingresar'
    expect(window.location.href).toBe("http://localhost/material-estudio/1");
  
    // Restore the original fetch function
    global.fetch.mockRestore();
  });
});
