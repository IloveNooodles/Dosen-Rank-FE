describe('Matkul Page', () => {
    it('should render matkul page with reviews', () => {
        cy.visit('http://localhost:3000/courses/socio-informatics');
        cy.get('[data-cy=summary-rating-title]').should('contain', 'SOCIO-INFORMATICS AND PROFESSIONALISM');
        cy.get('[data-cy=summary-rating-overall]').should('be.visible');

        // cy.get('[data-cy=review-card]').should('be.visible');
    });

});

export {};