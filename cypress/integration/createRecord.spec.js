import testData from "../fixtures/testData.json";
describe("Automated UI test suite around creating a new record.", () => {
  const username = Cypress.env("username");
  const password = Cypress.env("password");

  beforeEach(() => {
    cy.loginByAPI(username, password);
    cy.get('[data-cy="new-record1__btn"]').click();
    cy.get('input[name="aHdR_gHQmRT8ItVTL"]').as("firstName");
    cy.get('input[name="aHxOeHmCTIGd_hg1b"]').as("lastName");
    cy.get('input[name="aFjm80LnbJf780V6p"]').as("cityName");
    cy.get('textarea[name="aJDBDjjIFiTemxLGc"]').as("streetAddress");
    cy.get('input[name="aIaHwVkkr_seOK096"]').as("stateField");
    cy.get('input[placeholder="(xxx) xxx-xxxx"]').as("phoneField");
    cy.get('input[type="email"]').as("emailField");
    cy.get("input[name='aKTyoAgO27gfZC0Vd'] ").as("zipField");
  });
  it("Verify entering blank spaces on mandatory fields lead to save button disabled", () => {
    cy.get("@firstName").click().should("have.value", "");
    cy.get("@lastName").click().should("have.value", "");
    cy.get("@cityName").click().should("have.value", "");
    cy.get(
      "button[class='save-button btn btn-primary btn-primary-gradient'] span[class='text']"
    ).should("not.be.visible");
  });
  it("Verify entering first name alone and click save", () => {
    cy.get("@firstName").click().clear().type("dddd");

    cy.get(
      "button[class='save-button btn btn-primary btn-primary-gradient'] span[class='text']"
    )
      .should("be.visible")
      .click();

    cy.get("div.modal-body > h3")
      .should("be.visible")
      .should("contain", "Time Spent");

    cy.get("div.modal-footer > button")
      .should("be.visible")
      .should("contain", "Save")
      .click();

    cy.get(".title")
      .should("be.visible")
      .should("contain", "The record has validation error(s)");

    cy.get(".row:nth-child(1) > .col-md-6:nth-child(2) .error-messages")
      .should("be.visible")
      .should("contain", "Error: Value must be populated before submitting");

    cy.get(".row:nth-child(2) .error-messages")
      .should("be.visible")
      .should("contain", "Error: Value must be populated before submitting");
  });
  it("Verify entering last name alone and click save", () => {
    cy.get("@lastName").click().clear().type("ssss");

    cy.get(
      "button[class='save-button btn btn-primary btn-primary-gradient'] span[class='text']"
    )
      .should("be.visible")
      .click();

    cy.get("div.modal-body > h3")
      .should("be.visible")
      .should("contain", "Time Spent");

    cy.get("div.modal-footer > button")
      .should("be.visible")
      .should("contain", "Save")
      .click();

    cy.get(".title")
      .should("be.visible")
      .should("contain", "The record has validation error(s)");

    cy.get(".col-md-6:nth-child(1) .error-messages")
      .should("be.visible")
      .should("contain", "Error: Value must be populated before submitting");

    cy.get(".row:nth-child(2) .error-messages")
      .should("be.visible")
      .should("contain", "Error: Value must be populated before submitting");
  });
  it("Verify entering city name alone and click save", () => {
    cy.get("@cityName").click().clear().type("city");

    cy.get(
      "button[class='save-button btn btn-primary btn-primary-gradient'] span[class='text']"
    )
      .should("be.visible")
      .click();

    cy.get("div.modal-body > h3")
      .should("be.visible")
      .should("contain", "Time Spent");

    cy.get("div.modal-footer > button")
      .should("be.visible")
      .should("contain", "Save")
      .click();

    cy.get(".title")
      .should("be.visible")
      .should("contain", "The record has validation error(s)");

    cy.get(".col-md-6:nth-child(1) .error-messages")
      .scrollIntoView()
      .should("be.visible")
      .should("contain", "Error: Value must be populated before submitting");

    cy.get(".row:nth-child(1) > .col-md-6:nth-child(2) .error-messages")
      .scrollIntoView()
      .should("be.visible")
      .should("contain", "Error: Value must be populated before submitting");
  });
  it("Verify entering first  name and last name  and click save", () => {
    cy.get("@firstName").click().clear().type("sssss");
    cy.get("@lastName").click().clear().type("ssdsddd");

    cy.get(
      "button[class='save-button btn btn-primary btn-primary-gradient'] span[class='text']"
    )
      .should("be.visible")
      .click();

    cy.get("div.modal-body > h3")
      .should("be.visible")
      .should("contain", "Time Spent");

    cy.get("div.modal-footer > button")
      .should("be.visible")
      .should("contain", "Save")
      .click();

    cy.get(".title")
      .should("be.visible")
      .should("contain", "The record has validation error(s)");

    cy.get(".row:nth-child(2) .error-messages")
      .should("be.visible")
      .should("contain", "Error: Value must be populated before submitting");
  });
  it("Verify entering first  name and city name  and click save", () => {
    cy.get("@firstName").click().clear().type("sssss");
    cy.get("@cityName").click().clear().type("ccccc");

    cy.get(
      "button[class='save-button btn btn-primary btn-primary-gradient'] span[class='text']"
    )
      .should("be.visible")
      .click();

    cy.get("div.modal-body > h3")
      .should("be.visible")
      .should("contain", "Time Spent");

    cy.get("div.modal-footer > button")
      .should("be.visible")
      .should("contain", "Save")
      .click();

    cy.get(".title")
      .should("be.visible")
      .should("contain", "The record has validation error(s)");

    cy.get(".row:nth-child(1) > .col-md-6:nth-child(2) .error-messages")
      .scrollIntoView()
      .should("be.visible")
      .should("contain", "Error: Value must be populated before submitting");
  });
  it("Verify entering  last name and city and click save", () => {
    cy.get("@lastName").click().clear().type("ssdsddd");
    cy.get("@cityName").click().clear().type("ccccc");

    cy.get(
      "button[class='save-button btn btn-primary btn-primary-gradient'] span[class='text']"
    )
      .should("be.visible")
      .click();

    cy.get("div.modal-body > h3")
      .should("be.visible")
      .should("contain", "Time Spent");

    cy.get("div.modal-footer > button")
      .should("be.visible")
      .should("contain", "Save")
      .click();

    cy.get(".title")
      .should("be.visible")
      .should("contain", "The record has validation error(s)");

    cy.get(".col-md-6:nth-child(1) .error-messages")
      .scrollIntoView()
      .should("be.visible")
      .should("contain", "Error: Value must be populated before submitting");
  });
  it("Verify entering firstName,lastName and city and click save", () => {
    cy.fixture("testData").then((testDataFixture) => {
      cy.get("@firstName").click().clear().type(testDataFixture.firstName);
      cy.get("@lastName").click().clear().type(testDataFixture.lastName);
      cy.get("@cityName").click().clear().type(testDataFixture.city);
    });
    cy.get(
      "button[class='save-button btn btn-primary btn-primary-gradient'] span[class='text']"
    )
      .should("be.visible")
      .click();

    cy.get("div.modal-body > h3")
      .should("be.visible")
      .should("contain", "Time Spent");

    cy.get("div.modal-footer > button")
      .should("be.visible")
      .should("contain", "Save")
      .click();

    cy.get(".title").should("be.visible").should("contain", "Record saved");
    cy.fixture("testData").then((testDataFixture) => {
      cy.get("@firstName").should("have.value", testDataFixture.firstName);
      cy.get("@lastName").should("have.value", testDataFixture.lastName);
      cy.get("@cityName").should("have.value", testDataFixture.city);
    });
  });
  it("Verify entering optional fields and click save", () => {
    cy.fixture("testData").then((testDataFixture) => {
      cy.get("@firstName").click().clear().type(testDataFixture.firstName);
      cy.get("@lastName").click().clear().type(testDataFixture.lastName);
      cy.get("@cityName").click().clear().type(testDataFixture.city);
      cy.get("@streetAddress")
        .click()
        .clear()
        .type(testDataFixture.streetAddress);
      cy.get("@stateField").click().clear().type(testDataFixture.state);
      cy.get("@phoneField").click().clear().type(testDataFixture.phone);
      cy.get("@zipField").click().clear().type(testDataFixture.zip);
      cy.get("@emailField").click().clear().type(testDataFixture.email);
    });

    cy.get(
      "button[class='save-button btn btn-primary btn-primary-gradient'] span[class='text']"
    )
      .should("be.visible")
      .click();

    cy.get("div.modal-body > h3")
      .should("be.visible")
      .should("contain", "Time Spent");

    cy.get("div.modal-footer > button")
      .should("be.visible")
      .should("contain", "Save")
      .click();

    cy.get(".title").should("be.visible").should("contain", "Record saved");

    cy.fixture("testData").then((testDataFixture) => {
      cy.get("@firstName").should("have.value", testDataFixture.firstName);
      cy.get("@lastName").should("have.value", testDataFixture.lastName);
      cy.get("@cityName").should("have.value", testDataFixture.city);
      cy.get("@streetAddress").should(
        "have.value",
        testDataFixture.streetAddress
      );
      cy.get("@stateField").should("have.value", testDataFixture.state);
      cy.get("@phoneField").should("have.value", testDataFixture.phone);
      cy.get("@zipField").should("have.value", testDataFixture.zip);
      cy.get("@emailField").should("have.value", testDataFixture.email);
    });
  });
});
