import { expect, test } from "vitest";
import { generateSlug } from "./generateSlug";

test("generates a slug from title and id", () => {
  const title = "White Cheddar Grilled Cheese with cherry preserves & basil";
  const id = "4dT8tcb6ukGSIg2YyuGEOm";

  expect(generateSlug({ title, id })).toEqual(
    "white-cheddar-grilled-cheese-with-cherry-preserves--basil-4dT8tcb6ukGSIg2YyuGEOm",
  );
});
