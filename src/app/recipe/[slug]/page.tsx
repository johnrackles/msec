import { Rating } from "@/components/Rating";
import { TypographyH1 } from "@/components/Typography";
import { Badge } from "@/components/ui/badge";
import { RecipeEntrySkelton, api } from "@/lib/api";
import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

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
  const id = slug.split("-").pop();
  if (!id) {
    notFound();
  }

  const recipe = await getRecipe(id);
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
