import "../support/apiGetAuthToken.js";
import "../support/apiGetApplicationID.js";
let applicationId;

describe("Automated UI test suite around retrieving a new record with AppID and ID", () => {
  beforeEach(() => {
    cy.getAuthToken();
    cy.getApplicationID();
    cy.get("@appID").then((appIDValue) => {
      cy.log("appIDValue " + appIDValue);
      applicationId = appIDValue;
    });
  });
  it("Verify GET Rest API to retrieve a Record ", () => {
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
    cy.log("token is +" + token);
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
    })
      .then((response) => {
        cy.log(response);
        expect(response.status).to.equal(200);
        expect(response.body.id).to.not.be.null;
        cy.log(response.body.id);
      })
      .then((response) => {
        const recordID = response.body.id;
        cy.request({
          method: "GET",
          url: `${Cypress.env("API_URL")}/${applicationId}/record/${recordID}`,
          headers: { authorization, "Content-Type": "application/json" },
        }).then((response) => {
          expect(response.status).to.eq(200);
        });
      });
  });
});
