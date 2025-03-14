import { render, screen } from "@testing-library/react";
import { Button } from "../button";

test("renders button", () => {
  render(<Button appName="test">Click me</Button>);
  expect(screen.getByText("Click me")).toBeInTheDocument();
});
