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
  Cypress.log({
    name: "loginByAPI",
    message: `${username} | ${password}`,
  });

  cy.request({
    method: "POST",
    url: "/api/user/login",
    body: {
      username,
      password,
    },
  }).then((response) => {
    cy.log(response);
    cy.log(response.body.token);

    const token = response.body.token;
    localStorage.setItem("jwt_token", token);
  });
  cy.visit("/welcome");
  cy.url().should("include", "welcome");
  cy.get(".ngx-dropdown-toggle").click();
  cy.get(".profile-title > span").should("contain", "Jagannathan");
  cy.get(".ngx-dropdown-toggle").click();
});
