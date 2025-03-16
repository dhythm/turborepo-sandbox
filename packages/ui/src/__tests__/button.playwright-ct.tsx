import { test } from "@repo/playwright-ct-utilities";
import { Button } from "../button";

test("button", async ({ mount }) => {
  const component = await mount(<Button appName="test">Click me</Button>);

  await component.getByRole("button").click();

  await expect(component).toMatchSnapshot();
});
