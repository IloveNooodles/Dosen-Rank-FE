describe('Login page', () => {
    beforeEach(function () {
      cy.visit('http://localhost:3000/login');
      cy.get('#email').type('mgarebaldhie81@gmail.com');
    });
  
    it('Successfully login', () => {
      cy.get('#password').type('abc5dasar');
      cy.contains('button', 'Masuk').click();
      cy.contains('Login berhasil');
    });
  
    it('Failed login, wrong credentials', () => {
      cy.get('#password').type('password');
      cy.contains('button', 'Masuk').click();
      cy.contains('email atau password salah');
    });
  });
  
  export {};
  