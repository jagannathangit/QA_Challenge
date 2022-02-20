const username = Cypress.env("username");
const password = Cypress.env("password");

Cypress.Commands.add("getAuthToken", () => {
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
    Cypress.env("jwt_token", token);
  });
});
