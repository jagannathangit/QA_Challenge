Cypress.Commands.add("getIdentifier", () => {
  cy.getAuthToken();
  cy.getApplicationID();
  cy.get("@appID").then((appIDValue) => {
    cy.log("appIDValue " + appIDValue);
    applicationId = appIDValue;
    Cypress.env("appID", applicationId);
  });

  const payload = {
    applicationId: applicationId,
    values: {
      $type:
        "System.Collections.Generic.Dictionary`2[[System.String, mscorlib],[System.Object, mscorlib]], mscorlib",
      aFjm80LnbJf780V6p: "chicago",
      aHdR_gHQmRT8ItVTL: "hello",
      aHxOeHmCTIGd_hg1b: "TEST",
    },
  };
  const token = Cypress.env("jwt_token");
  const authorization = `bearer ${token}`;

  const apiURL = Cypress.env("API_URL");
  cy.log("apiURL is +" + apiURL);
  const URL = `${Cypress.env("API_URL")}/${applicationId}/record`;
  cy.log("URL is +" + URL);
  cy.request({
    method: "POST",
    url: `${Cypress.env("API_URL")}/${applicationId}/record`,
    headers: { authorization, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).then((response) => {
    cy.log(response);
    expect(response.status).to.equal(200);
    //body.id
    expect(response.body.id).to.not.be.null;
    cy.log(response.body.id);
    cy.wrap(response.body.id).as("appIdentifier");
  });
});
