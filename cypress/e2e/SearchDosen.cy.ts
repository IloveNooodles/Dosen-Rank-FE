describe('Search Dosen', () => {
    beforeEach(function () {
    cy.visit('http://localhost:3000/search/institut-teknologi-bandung?page=1');
    });

    it('Search exist dosen', () => {
        cy.get("#search-bar").should("exist");
        cy.get("#search-bar").type("gare");
        cy.get("#search-bar").should("have.value", "gare");

        cy.get("#search-bar").type("{enter}")
        cy.contains("gare").should("exist");
    });
});

export {};