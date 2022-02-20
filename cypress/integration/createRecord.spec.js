describe("Automated UI test suite around creating a new record.", () => {
  const username = Cypress.env("username");
  const password = Cypress.env("password");

  beforeEach(() => {
    cy.loginByAPI(username, password);
    cy.get('[data-cy="new-record1__btn"]').click();
    cy.get('input[name="aHdR_gHQmRT8ItVTL"]').as("firstName");
    cy.get('input[name="aHxOeHmCTIGd_hg1b"]').as("lastName");
    cy.get('input[name="aFjm80LnbJf780V6p"]').as("cityName");
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
  it.only("Verify entering firstName,lastName and city and click save", () => {
    cy.get("@firstName").click().clear().type("Dr.Stephen");
    cy.get("@lastName").click().clear().type("Strange");
    cy.get("@cityName").click().clear().type("New York");

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
  });
});
