import React from "react";
import { mount } from "cypress/react";
import Contact from "../../src/pages/Contact.jsx";

describe("Contact Page Component", () => {
  it("mounts successfully", () => {
    mount(<Contact />);
  });

  it("renders the form fields", () => {
    mount(<Contact />);
    cy.contains("Full Name").should("exist");
    cy.contains("Email Address").should("exist");
  });
});
