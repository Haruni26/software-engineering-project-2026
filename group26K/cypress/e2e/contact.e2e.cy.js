describe("Contact Page (E2E)", () => {
  it("loads successfully", () => {
    cy.visit("http://localhost:5173/contacts");
    cy.contains("Contact").should("exist");
    cy.contains("Full Name").should("exist");
  });

  it("detects the form fields", () => {
    cy.visit("http://localhost:5173/contacts");
    cy.get("input[name='fullName']").should("exist");
    cy.get("input[name='email']").should("exist");
  });
});
