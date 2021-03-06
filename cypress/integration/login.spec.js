describe("Automated UI test suite around the login page.", () => {
  const username = Cypress.env("username");
  const password = Cypress.env("password");

  beforeEach(() => {
    cy.visit("/login");
  });
  it("should be able to log in the Test Site and show  home page information", () => {
    cy.loginByUI(username, password);

    cy.url().should("include", "welcome");
    cy.get(".ngx-dropdown-toggle").click();
    cy.get(".profile-title > span").should("contain", "Jagannathan");
    cy.logoutByUI();
  });
  it("should not be able to log in with incorrect password", () => {
    cy.get('[data-cy="username__input"]').clear().type(username);
    cy.get('[data-cy="password__input"]')
      .clear()
      .type("incorrect-password")
      .type("{enter}");

    cy.get(".login-error").should("contain", "Login failed.");
    cy.url().should("contain", Cypress.config().baseUrl);
  });
  it("should not be able to log in with incorrect username", () => {
    cy.get('[data-cy="username__input"]').clear().type("incorrect-username");
    cy.get('[data-cy="password__input"]')
      .clear()
      .type(password)
      .type("{enter}");

    cy.get(".login-error").should("contain", "Login failed.");
    cy.url().should("contain", Cypress.config().baseUrl);
  });
  it("should not be able to log in with empty username and empty password", () => {
    cy.get("[data-cy=username__input]").click().should("have.value", "");
    cy.get("[data-cy=password__input]").click().should("have.value", "");
    cy.get('[data-cy="submit__btn"]').should("be.disabled");
    cy.url().should("contain", Cypress.config().baseUrl);
  });
});
