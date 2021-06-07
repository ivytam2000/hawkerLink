import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import InfoText from "./InfoText";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders with correct fields", () => {
  act(() => {
    render(<InfoText location="West" storeName="Abangs Chicken Rice" language="Hokkien" />, container);
  });
  expect(container.textContent).toBe(" The store name is Abangs Chicken Rice. The location is West. The language spoken is Hokkien. ");

});