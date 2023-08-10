import { Rating } from "@/components/Rating";
import { TypographyH1, TypographyH3 } from "@/components/Typography";
import { Badge } from "@/components/ui/badge";
import { RecipeEntrySkelton, api } from "@/lib/api";
import { generateSlug } from "@/lib/generateSlug";
import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

export async function generateStaticParams() {
  const entries =
    // withoutUnresolvableLinks is the magic to make typescript happy
    await api.withoutUnresolvableLinks.getEntries<RecipeEntrySkelton>({
      content_type: "recipe",
    });

  const slugs = entries.items.map((entry) =>
    generateSlug({ id: entry.sys.id, title: entry.fields.title }),
  );

  return slugs.map((slug) => ({
    slug,
  }));
}

async function getRecipe(id: string) {
  const recipe =
    await api.withoutUnresolvableLinks.getEntry<RecipeEntrySkelton>(id);
  return recipe;
}

export default async function Recipe({
  params: { slug },
}: {
  params: { slug: string };
}) {
  // we don't care about most if the slug, we just want the id
  // slug is in the format of "title-id"
  const id = slug.split("-").pop();
  // if the id is not found, we should return 404
  if (!id) {
    notFound();
  }

  const recipe = await getRecipe(id);
  // if the recipe is not found, we should return 404
  if (!recipe) {
    notFound();
  }

  const image = recipe.fields.photo?.fields.file;

  return (
    <div className="mx-auto max-w-4xl">
      {image ? (
        <div className="mb-4 aspect-video overflow-hidden rounded md:mb-8 lg:mb-12">
          <Image
            src={`https:${image.url}`}
            width={image.details.image?.width}
            height={image.details.image?.height}
            sizes="100vw"
            alt={recipe.fields.title}
            className="mb-4 origin-center scale-105 transition hover:scale-100 md:mb-8 lg:mb-12"
          />
        </div>
      ) : null}
      <div className="mx-auto max-w-2xl">
        <TypographyH1>{recipe.fields.title}</TypographyH1>
        {recipe.fields.chef ? (
          <TypographyH3>by {recipe.fields.chef.fields.name}</TypographyH3>
        ) : null}
        <div className="mt-4 flex flex-row items-center">
          {Array.isArray(recipe.fields.tags) && recipe.fields.tags[0] ? (
            <Badge className="mr-4">{recipe.fields.tags[0]?.fields.name}</Badge>
          ) : null}
          <Rating id={id} />
        </div>
        <ReactMarkdown className="mt-4">
          {recipe.fields.description}
        </ReactMarkdown>
      </div>
    </div>
  );
}
