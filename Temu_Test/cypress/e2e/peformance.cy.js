describe('Performance Tests', () => {
  describe('Page Loading Performance', () => {
    it('should load the page within acceptable time', () => {
      // Set up intercepts BEFORE visiting the page
      cy.intercept('GET', '**').as('allRequests');

      // Start measuring
      const start = Date.now();

      cy.visit('https://demoblaze.com/', { timeout: 30000 });

      // Wait for key network requests to finish (adjust as needed)
      cy.wait('@allRequests', { timeout: 10000 });

      // Now check performance metrics
      cy.window().then((win) => {
        const performance = win.performance;
        if (performance) {
          const navigationTiming = performance.getEntriesByType('navigation')[0];
          const paintTiming = performance.getEntriesByType('paint');

          const loadTime = Date.now() - start;
          const firstPaint = paintTiming.find(entry => entry.name === 'first-paint');
          const firstContentfulPaint = paintTiming.find(entry => entry.name === 'first-contentful-paint');

          cy.log(`Total Load Time: ${loadTime}ms`);
          cy.log(`First Paint: ${firstPaint ? firstPaint.startTime : 'N/A'}ms`);
          cy.log(`First Contentful Paint: ${firstContentfulPaint ? firstContentfulPaint.startTime : 'N/A'}ms`);

          expect(loadTime).to.be.lessThan(5000, 'Page should load within 5 seconds');
          if (firstContentfulPaint) {
            expect(firstContentfulPaint.startTime).to.be.lessThan(2000, 'First contentful paint should be under 2 seconds');
          }
        }
      });
    });
  });
});
