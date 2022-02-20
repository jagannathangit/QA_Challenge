Cypress.Commands.add("getApplicationID", () => {
  const token = Cypress.env("jwt_token");
  cy.log("token is +" + token);
  const authorization = `bearer ${token}`;

  cy.request({
    method: "GET",
    url: "https://qa-practical.qa.swimlane.io:443/api/app",
    headers: { authorization, "Content-Type": "application/json" },
  }).then((response) => {
    expect(response.status).to.equal(200);
    cy.log(response.body[0].id);
    cy.wrap(response.body[0].id).as("appID");
  });
});
