describe("Gestion des taches ",()=>{
    it("Ajoute une tache",()=>{
        cy.visit('http://localhost:3000/');
        cy.get("input[name='name']").type("Nouvelle tache");
        cy.get("input[name='description']").type("Description");
        cy.get("button[type='submit']").click();
        cy.contains("Nouvelle tache")

    })
})