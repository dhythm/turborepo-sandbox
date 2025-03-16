import { expect, test } from "@repo/playwright-ct-utilities";
import { Button } from "../button";

test("button", async ({ mount }) => {
  const component = await mount(<Button appName="test">Click me</Button>);

  await component.getByText("Click me").click();

  await expect(component).toMatchAriaSnapshot();
});
