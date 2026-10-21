describe("Ecosystem Page (E2E)", () => {
  it("loads successfully", () => {
    cy.visit("http://localhost:5173/ecosystem");
    cy.contains("Ecosystem").should("exist");
  });

  it("shows at least one ecosystem section", () => {
    cy.visit("http://localhost:5173/ecosystem");
    cy.get("img").should("exist");
  });
});
