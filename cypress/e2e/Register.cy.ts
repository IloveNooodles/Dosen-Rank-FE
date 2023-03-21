describe('Register page', () => {
  beforeEach(function () {
    cy.visit('http://localhost:3000/register');
    cy.get('#name').type('garegare');
    cy.get('#password').type('abc5dasar');
    cy.get('#university').type('Institut Teknologi Bandung').type('{enter}');
  });
  it('Successfully register', () => {
    cy.intercept('POST', '/users*', {
      statusCode: 201,
      body: {
        message: 'Akun berhasil dibuat',
      },
    });
    cy.get('#email').type('mgarebaldhie81@testing.com');
    cy.contains('Daftar').click();
    cy.contains('Akun berhasil dibuat');
  });
  it('Failed register, user already exist', () => {
    cy.get('#email').type('mgarebaldhie81@gmail.com');
    cy.contains('Daftar').click();
    cy.contains('Failed to create user');
    cy.contains('user already exists');
  });
});

export {};
