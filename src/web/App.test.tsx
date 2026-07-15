import { it } from "vitest";
import { render } from "@testing-library/react";
import { RouterProvider } from "react-router";
import { router } from "@/web/App";

it("renders the app", () => {
  render(<RouterProvider router={router} />);
});
