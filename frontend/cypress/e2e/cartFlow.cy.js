describe('Cart Full Flow Test (Add ➜ View ➜ Remove)', () => {
    it('should add a product to cart, view it, and remove it with confirmation', () => {
      // Assume user is already logged in
  
      cy.visit('http://localhost:3000/');
  
      // Confirm products are visible
      cy.contains('Our Products').should('exist');
  
      // Add first product to cart
      cy.get('.product-card').first().within(() => {
        cy.contains('🛒 Add to Cart').click();
      });
  
      // Confirm cart count shows "View Cart (1)"
      cy.get('.floating-cart-btn').should('contain', 'View Cart (1)');
  
      // Click "View Cart" to go to cart page
      cy.get('.floating-cart-btn').click();
  
      // Confirm we're on cart page
      cy.url().should('include', '/cart');
      cy.contains('Your Cart').should('exist');
      cy.get('.cart-item').should('have.length.at.least', 1);
  
      // Click "❌ Remove" button on first cart item
      cy.get('.cart-item').first().within(() => {
        cy.contains('❌ Remove').click();
      });
  
      // Confirm SweetAlert "Yes, remove it!" button
      cy.get('.swal2-confirm').click();
  
      // Wait for removal to complete
      cy.wait(500);
  
      // Confirm item removed from cart
      cy.get('.cart-item').should('have.length.lessThan', 1);
    });
  });
  