describe('University Page', () => {
    it('should render university page with reviews', () => {
        cy.visit('http://localhost:3000/universities/institut-teknologi-bandung');
        cy.get('[data-cy=summary-rating-title]').should('contain', 'INSTITUT TEKNOLOGI BANDUNG');
        cy.get('[data-cy=summary-rating-overall]').should('be.visible');

        cy.get('[data-cy=review-card]').should('be.visible');
    });

});

export {};