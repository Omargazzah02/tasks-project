import request from "supertest"
import {GET , POST , DELETE } from  "../app/api/tasks/route"


test("POST crée une nouvelle tâche", async () => {
    const newTask = { name: "Tâche pour le test!", description: "Tester l'API" };

    const mockRequest = {
        json: async () => newTask, 
    };

    const result = await POST(mockRequest);

    const responseData = await result.json();

    expect(result.status).toBe(201);
    expect(responseData.name).toBe(newTask.name);
    expect(responseData.description).toBe(newTask.description);

});

test("GET retourne la liste des tâches", async () => {
    const mockRequest = {}; 

    const result = await GET(mockRequest);
    const responseData = await result.json();

    expect(result.status).toBe(205);
    expect(Array.isArray(responseData)).toBe(true);
});






test("DELETE supprime une tâche existante", async () => {
    const mockCreateRequest = {
        json: async () => ({ name: "Tâche temporaire", description: "À supprimer" }),
    };

    const createResult = await POST(mockCreateRequest);
    const createdTask = await createResult.json();

    expect(createResult.status).toBe(201);
    expect(createdTask.id).toBeDefined();

    const mockDeleteRequest = {
        json: async () => ({ id: createdTask.id }),
    };

    const deleteResult = await DELETE(mockDeleteRequest);
    const deleteResponse = await deleteResult.json();

    expect(deleteResult.status).toBe(200);
    expect(deleteResponse.message).toBe("Tâche supprimée");
});
