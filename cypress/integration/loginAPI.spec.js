describe("Automated UI test suite around the login page.", () => {
  const username = Cypress.env("username");
  const password = Cypress.env("password");

  beforeEach(() => {});
  it("should be able to log in the Test Site and show  home page information", () => {
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
  });
});
