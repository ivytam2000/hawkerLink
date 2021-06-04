import React from "react";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";

import InfoText from "./HawkerSearchBar";

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
      render(<InfoText storeName= "Abangs Chicken Rice" location= "West" language= "Hokkien" />, container);
    });
    expect(container.textContent).toBe("The store name is Abands Chicken Rice. The location is West. The language spoken is Hokkien.");

  });