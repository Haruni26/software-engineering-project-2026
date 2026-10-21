import React from "react";
import { mount } from "cypress/react";
import MapView from "../../src/pages/MapView.jsx";

describe("Map Page Component", () => {
  it("mounts successfully", () => {
    mount(<MapView />);
  });

  it("renders map controls or buttons", () => {
    mount(<MapView />);
    cy.contains("YOU ARE HERE").should("exist");
  });
});
