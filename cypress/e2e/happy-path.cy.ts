/// <reference types="cypress" />

describe("Happy path: login and verify persistence", () => {
  it("logs in and sees users page", () => {
    cy.visit("/login");
    cy.get('[data-cy="login-email"]').type("test@example.com");
    cy.get('[data-cy="login-password"]').type("password123");
    cy.get('[data-cy="login-submit"]').click();

    cy.url().should("include", "/users");

    cy.get('[data-cy="users-row"]')
      .first()
      .within(() => {
        cy.get('button[aria-label="More actions"]').click();
      });

    cy.contains("button", /view details/i).click();

    cy.url().should("match", /\/users\/\w+$/);
  });
});
