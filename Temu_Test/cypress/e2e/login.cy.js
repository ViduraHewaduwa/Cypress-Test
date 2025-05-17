describe('DemoBlaze Login Tests', () => {
  const validUser = {
    username: 'Navoda',
    password: 'Navoda'
  };

  const invalidUser = {
    username: 'invalid_user',
    password: 'wrong_password'
  };

  beforeEach(() => {
    cy.visit('https://demoblaze.com/');
  });

it('should login successfully with valid credentials', () => {
  cy.intercept('POST', '**/login').as('loginRequest');

  cy.get('#login2').click();
  cy.get('#logInModal').should('be.visible');

  cy.get('#loginusername')
    .should('be.visible')
    .clear()
    .type(validUser.username);

  cy.get('#loginpassword')
    .should('be.visible')
    .clear()
    .type(validUser.password);

  cy.get('button[onclick="logIn()"]').click();

  // Wait for login API and check status
  cy.wait('@loginRequest').its('response.statusCode').should('eq', 200);

  cy.get('#nameofuser', { timeout: 10000 })
    .should('be.visible')
    .and('contain', `Welcome ${validUser.username}`);

  cy.get('#logInModal').should('not.be.visible');
});



    it('should not login with invalid credentials', () => {
      cy.get('#login2').click();
      cy.get('#loginusername').type(invalidUser.username);
      cy.get('#loginpassword').type(invalidUser.password);
      cy.get('button[onclick="logIn()"]').click();

      // Listen for alert and validate message
      cy.on('window:alert', (alertText) => {
        expect(alertText).to.equal('User does not exist.');
      });
    });

    it('should not login with empty credentials', () => {
      cy.get('#login2').click();
      cy.get('button[onclick="logIn()"]').click();

      cy.on('window:alert', (alertText) => {
        expect(alertText).to.equal('Please fill out Username and Password.');
      });
    });
  });

