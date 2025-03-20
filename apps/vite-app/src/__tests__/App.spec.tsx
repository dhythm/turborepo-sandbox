import { render, screen } from "@testing-library/react";
import App from "../App";
test("renders hello message", () => {
  render(<App />);
  expect(
    screen.getByRole("heading", { name: "Vite + React" }),
  ).toBeInTheDocument();
});
