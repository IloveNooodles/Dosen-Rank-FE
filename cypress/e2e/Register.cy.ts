describe('Register page', () => {
  beforeEach(function () {
    cy.visit('http://localhost:3000/register');
    cy.get('#name').type('garegare');
    cy.get('#password').type('abc5dasar');
    cy.get('#university').type('Institut Teknologi Bandung').type('{enter}');
  });
  it('Failed register, user already exist', () => {
    cy.get('#email').type('mgarebaldhie81@gmail.com');
    cy.contains('Daftar').click();
    cy.contains('Failed to create user');
    cy.contains('user already exists');
  });
});

export {};
