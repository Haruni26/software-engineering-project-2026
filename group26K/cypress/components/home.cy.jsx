import React from "react";
import { mount } from "cypress/react";
import Home from "../../src/pages/Home.jsx";

describe("Home Page Component", () => {
  it("mounts successfully", () => {
    mount(<Home />);
  });

  it("displays welcome message", () => {
    mount(<Home />);
    cy.contains("Welcome to the Woodland Conservation Site").should("exist");
  });
});
