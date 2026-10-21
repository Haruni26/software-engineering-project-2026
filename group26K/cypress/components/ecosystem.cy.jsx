import React from "react";
import { mount } from "cypress/react";
import Ecosystem from "../../src/pages/Ecosystem.jsx";

describe("Ecosystem Page Component", () => {
  it("mounts successfully", () => {
    mount(<Ecosystem />);
  });

  it("has ecosystem content", () => {
    mount(<Ecosystem />);
    cy.contains("Ecosystem").should("exist");
  });
});
