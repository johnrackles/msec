import { GetRecipeList } from "@/app/page";
import { Rating } from "./Rating";
import { Badge } from "./ui/badge";

export function MetaBar({
  recipe,
  id,
}: {
  recipe: Pick<GetRecipeList["items"][number]["fields"], "tags">;
  id: string;
}) {
  return (
    <div className="mt-4 flex flex-row items-center">
      <Rating id={id} className="mr-4" />
      {Array.isArray(recipe.tags) ? (
        <ul className="flex flex-row">
          {recipe.tags.map((tag) =>
            tag ? (
              <li key={tag.fields.name} className="mr-2">
                <Badge>{tag.fields.name}</Badge>
              </li>
            ) : null,
          )}
        </ul>
      ) : null}
    </div>
  );
}
