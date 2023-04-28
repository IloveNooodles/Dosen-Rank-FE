describe('Search component', () => {
    beforeEach(function () {
        cy.visit('http://localhost:3000/search?name=');
    });

    it('should render', () => {
        cy.get("#search-bar").should("exist");
        cy.get("#search-bar").type("institut teknologi bandung");
        cy.get("#search-bar").should("have.value", "institut teknologi bandung");

        cy.get("#search-bar").type("{enter}")
        cy.contains("Institut Teknologi Bandung").should("exist");
    });
});

export {};