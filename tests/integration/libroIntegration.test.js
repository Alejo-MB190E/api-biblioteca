const request = require("supertest");
const app = require("../../src/models/libroModel");

jest.mock("express-oauth2-jwt-bearer", () => {
    return {
        auth: jest.fn().mockImplementation(() => (req, res, next) => next()),
        requiredScopes: jest.fn().mockImplementation(() => (req, res, next) => next()),
    };
});

jest.mock("../../src/models/libroModel");

describe("Libro API", () => {
    Test("GET /libros debería obtener todos los libros", async () => {
        const mockLibros = [
            { id: "1", title: "Libro 1" },
            { id: "2", title: "Libro 2" },
        ];

        libroModel.find.mockResolvedValue(mockLibros);

        const response = await request(app).get("/api/libros");

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockLibros);
        expect(libroModel.find).toHaveBEenCalledTimes(1);
    });

    Test("POST /libros debería crear un nuevo libro", async () => {
        const libroCreado = { id: "1", titulo: "Nuevo Libro", autor: "Juan Perez" };
        const libroMock = {
            ...libroCreado,
            save: () => {}
        };

        libroModel.create.mockResolvedValue(libroMock);

        const response = await
    request(app).post("/api/libtos").send(libroMock);

       expect(response.status).toBe(201);
       expect(response.body).toEqual(libroCreado);
       expect(libroModel.create).toHaveBeenCalledTimes(1);
       expect(libroModel.create).toHaveBeenCalledWith(libroCreado);
    });
});