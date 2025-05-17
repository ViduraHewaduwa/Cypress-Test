
  describe('UI Tests', () => {
  beforeEach(() => {
    cy.visit('https://demoblaze.com/');
  });

  describe('Product Display', () => {
    it('should display product cards correctly', () => {
      cy.get('#tbodyid .card').should('be.visible').and('have.length.at.least', 1);
      cy.get('.card-img-top').should('be.visible');
      cy.get('.card-title').should('be.visible');
      cy.get('.card-text').should('be.visible');
    });

    it('should show product details when clicking on product', () => {
      cy.get('.card-title a').first().click();
      cy.get('.product-content').should('be.visible');
      cy.get('.price-container').should('be.visible');
      cy.get('.btn-success').should('be.visible');
    });
  });

  describe('Category Filtering', () => {
    it('should filter products by category', () => {
      // Test Phones category
      cy.contains('a', 'Phones').click();
      cy.get('.card-title').should('exist');
      
      // Test Laptops category
      cy.contains('a', 'Laptops').click();
      cy.get('.card-title').should('exist');
      
      // Test Monitors category
      cy.contains('a', 'Monitors').click();
      cy.get('.card-title').should('exist');
    });
  });

  describe('Responsive Design', () => {
    it('should adjust product grid on different screen sizes', () => {
      // Test on desktop
      cy.viewport(1200, 800);
      cy.get('#tbodyid .card').should('be.visible');
      
      // Test on tablet
      cy.viewport('ipad-2');
      cy.get('#tbodyid .card').should('be.visible');
      
      // Test on mobile
      cy.viewport('iphone-6');
      cy.get('#tbodyid .card').should('be.visible');
    });
  });
});