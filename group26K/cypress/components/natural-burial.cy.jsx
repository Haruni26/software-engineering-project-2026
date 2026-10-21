import React from "react";
import { mount } from "cypress/react";
import NaturalBurial from "../../src/pages/NaturalBurial.jsx";

describe("Natural Burial Page Component", () => {
  it("mounts successfully", () => {
    mount(<NaturalBurial />);
  });

  it("displays natural burial content", () => {
    mount(<NaturalBurial />);
    cy.contains("Natural Burial").should("exist");
  });
});
