import React from "react";
import { mount } from "cypress/react";
import Gallery from "../../src/pages/Gallery.jsx";

describe("Gallery Page Component", () => {
  it("mounts successfully", () => {
    mount(<Gallery />);
  });

  it("shows gallery images or section title", () => {
    mount(<Gallery />);
    cy.contains("Gallery").should("exist");
  });
});
