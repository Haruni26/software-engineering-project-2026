describe("Home Page (E2E)", () => {
  it("loads successfully", () => {
    cy.visit("http://localhost:5173/");
    cy.contains("Welcome to the Woodland Conservation Site").should("exist");
  });

  it("shows the main navigation", () => {
    cy.visit("http://localhost:5173/");
    cy.contains("About").should("exist");
    cy.contains("Map").should("exist");
  });
});
