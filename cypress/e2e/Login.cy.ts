describe('Login page', () => {
    beforeEach(function () {
      cy.visit('http://localhost:3000/login');
      cy.get('#email').type('mgarebaldhie81@gmail.com');
    });
  
    it('Successfully login', () => {
      cy.get('#password').type('abc5dasar');
      cy.get(`[data-testid="user-login-btn"]`).click();
      cy.contains('Login berhasil');
    });
  
    it('Failed login, wrong credentials', () => {
      cy.get('#password').type('password');
      cy.get(`[data-testid="user-login-btn"]`).click();
      cy.contains('email atau password salah');
    });
  });
  
  export {};
  