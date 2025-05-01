describe('Add Product Test', () => {
    it('Should add a new product and show success alert', () => {
      cy.visit('http://localhost:3000/add-product');
  
      const randomNum = Math.floor(Math.random() * 10000);
  
      // Fill the add product form
      cy.get('input[name="title"]').type(`Cypress Test Product ${randomNum}`);
      cy.get('input[name="price"]').type('150');
      cy.get('textarea[name="description"]').type('This is a test product added via Cypress script.');
  
      // Submit the form
      cy.get('button[type="submit"]').click();
  
      // Confirm SweetAlert appears with correct title
      cy.get('.swal2-title')
        .should('be.visible')
        .and('contain', 'Product Added!');
    });
  });
  