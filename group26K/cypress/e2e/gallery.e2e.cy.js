describe("Gallery Page (E2E)", () => {
  it("loads successfully", () => {
    cy.visit("http://localhost:5173/gallery");
    cy.contains("Gallery").should("exist");
  });

  it("loads at least one gallery image", () => {
    cy.visit("http://localhost:5173/gallery");
    cy.get("img").should("exist");
  });
});
