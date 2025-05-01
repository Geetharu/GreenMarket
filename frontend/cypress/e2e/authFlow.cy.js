describe('Authentication Flow Test (Register + Login)', () => {

    // Test Case 1: User Registration
    it('Should register a new user successfully', () => {
      // Visit registration page
      cy.visit('http://localhost:3000/register');
  
      // Use unique email each time to avoid duplicates
      const uniqueEmail = `user${Date.now()}@test.com`;
  
      // Fill registration form fields
      cy.get('input[name="name"]').type('Test User');
      cy.get('input[name="email"]').type(uniqueEmail);
      cy.get('input[name="password"]').type('123456');
  
      // Submit registration form
      cy.get('button[type="submit"]').click();
  
      // Check for success alert
      cy.contains('Registered!').should('exist');
    });
  
    // Test Case 2: User Login
    it('Should log in and show products', () => {
      // Visit login page
      cy.visit('http://localhost:3000/login');
  
      // Enter existing test credentials
      cy.get('input[name="email"]').type('testuser@gmail.com');
      cy.get('input[name="password"]').type('123456');
  
      // Submit login form
      cy.get('button[type="submit"]').click();
  
      // Check for success alert
      cy.contains('Login Successful').should('exist');
  
      // Wait for redirect
      cy.wait(1000);
  
      // Check for product page content
      cy.contains('Our Products').should('exist');
    });
  
  });
  