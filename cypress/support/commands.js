// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("loginByAPI", (username, password) => {
  cy.request({
    method: "POST",
    url: "/api/user/login",
    body: {
      username,
      password,
    },
  }).then((response) => {
    expect(response.status).to.equal(200);
    const token = response.body.token;
    localStorage.setItem("jwt_token", token);
  });
  cy.visit("/welcome");
  cy.url().should("include", "welcome");
  cy.get(".ngx-dropdown-toggle").click();
  cy.get(".profile-title > span").should("contain", "Jagannathan");
  cy.get(".ngx-dropdown-toggle").click();
});

Cypress.Commands.add("loginByUI", (username, password) => {
  cy.get('[data-cy="username__input"]').clear().type(username);
  cy.get('[data-cy="password__input"]').clear().type(password, { log: false });

  cy.get('[data-cy="submit__btn"]').click();
});

Cypress.Commands.add("logoutByUI", () => {
  cy.get(".btn.logout-button.pull-right").should("contain", "Log Out").click();

  cy.get("h1[data-cy='logout__msg']").should(
    "contain",
    "You have successfully logged out"
  );
  cy.get("[data-cy='return__btn']")
    .should("contain", "Return to Swimlane")
    .click();
  cy.url().should("contain", Cypress.config().baseUrl);
});
