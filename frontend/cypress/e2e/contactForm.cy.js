describe('Contact Form Tests', () => {

    // Test Case 1: Validation - Invalid Name (too short)
    it('Should show validation error for invalid name', () => {
      cy.visit('http://localhost:3000/contact');
  
      // Fill name with only 1 character (invalid)
      cy.get('input[name="name"]').type('A');
  
      // Fill valid email and message
      cy.get('input[name="email"]').type('testuser@test.com');
      cy.get('textarea[name="message"]').type('This is a valid message.');
  
      // Submit the form
      cy.get('button[type="submit"]').click();
  
      // Expect SweetAlert error for invalid name
      cy.get('.swal2-title')
        .should('be.visible')
        .and('contain', 'Invalid Name');
    });
  
    // Test Case 2: Successful form submission
    it('Should submit contact form successfully', () => {
      cy.visit('http://localhost:3000/contact');
  
      // Use a unique email to avoid reuse conflicts
      const randomEmail = `user${Date.now()}@test.com`;
  
      // Fill form with valid data
      cy.get('input[name="name"]').type('Test User');
      cy.get('input[name="email"]').type(randomEmail);
      cy.get('textarea[name="message"]').type('This is a proper test message with more than 10 characters.');
  
      // Submit the form
      cy.get('button[type="submit"]').click();
  
      // Expect SweetAlert success message
      cy.get('.swal2-title')
        .should('be.visible')
        .and('contain', 'Thank You!');
    });
  
  });
  