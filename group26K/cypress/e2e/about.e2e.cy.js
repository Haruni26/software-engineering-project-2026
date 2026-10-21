describe("About Page (E2E)", () => {
  it("loads successfully", () => {
    cy.visit("http://localhost:5173/about");
    cy.contains("About St. Margaret’s Bay Woodland Conservation").should("exist");
  });

  it("shows the About Us section", () => {
    cy.visit("http://localhost:5173/about");
    cy.contains("About Us").should("exist");
  });
});
