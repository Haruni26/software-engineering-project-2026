import React from "react";
import { mount } from "cypress/react";
import About from "../../src/pages/About.jsx";

describe("About Page Component", () => {
  it("mounts successfully", () => {
    mount(<About />);
  });

  it("shows the page title", () => {
    mount(<About />);
    cy.contains("About St. Margaret’s Bay Woodland Conservation").should("exist");
  });
});
