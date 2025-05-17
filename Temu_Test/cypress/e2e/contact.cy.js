describe('Contact Form Tests', () => {
  beforeEach(() => {
    cy.visit('https://demoblaze.com/');
    cy.get('a[data-target="#exampleModal"]').click();
  });

  it('should submit contact form with valid data', () => {
    cy.get('#recipient-email').type('test@example.com');
    cy.get('#recipient-name').type('Test User');
    cy.get('#message-text').type('This is a test message');
    
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alert');
    });

    cy.get('button').contains('Send message').click();

    cy.get('@alert').should('have.been.calledWith', 'Thanks for the message!!');
    cy.get('#exampleModal').should('not.be.visible');
  });
});

