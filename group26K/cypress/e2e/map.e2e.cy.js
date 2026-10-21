describe("Map Page (E2E)", () => {
  it("loads successfully", () => {
    cy.visit("http://localhost:5173/map");
    cy.contains("YOU ARE HERE").should("exist");
  });

  it("renders at least one marker or map element", () => {
    cy.visit("http://localhost:5173/map");
    cy.get(".leaflet-container").should("exist");
  });
});
