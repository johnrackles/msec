import { RecipeCard } from "@/components/RecipeCard";
import { TypographyH1, TypographyH2 } from "@/components/Typography";
import { RecipeEntrySkelton, api } from "@/lib/api";

export type GetRecipeList = Awaited<ReturnType<typeof getRecipeList>>;

export const revalidate = 60; // 1minute

async function getRecipeList() {
  const entries =
    // withoutUnresolvableLinks is the magic to make typescript happy
    await api.withoutUnresolvableLinks.getEntries<RecipeEntrySkelton>({
      content_type: "recipe",
    });

  return entries;
}

export default async function Home() {
  const recipes = await getRecipeList();

  return (
    <>
      <TypographyH1>Welcome to Marley Spoon</TypographyH1>
      <TypographyH2>Recipes</TypographyH2>
      <ul className="mx-auto my-4 mt-4 grid max-w-4xl items-stretch justify-center gap-4 md:mt-8 md:grid-cols-2 md:gap-8 lg:mt-12 lg:gap-12">
        {recipes.items.map((recipe) => (
          <li key={recipe.sys.id} className="self-stretch">
            <RecipeCard {...recipe.fields} id={recipe.sys.id} />
          </li>
        ))}
      </ul>
    </>
  );
}
