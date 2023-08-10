import { GetRecipeList } from "@/app/page";
import { generateSlug } from "@/lib/generateSlug";
import Image from "next/image";
import Link from "next/link";
import { MetaBar } from "./MetaBar";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "./ui/card";

export function RecipeCard({
  title,
  photo,
  tags,
  id,
}: Pick<
  GetRecipeList["items"][number]["fields"],
  "title" | "description" | "photo" | "tags"
> & {
  id: string;
}) {
  return (
    <Card className="mx-auto flex h-full flex-col">
      <div className="relative">
        {photo?.fields.file?.url ? (
          <Link href={`/recipe/${generateSlug({ id, title })}`}>
            <Image
              src={`https:${photo.fields.file.url}`}
              alt={`Go to recipe ${title}`}
              width={photo.fields.file.details.image?.width}
              height={photo.fields.file.details.image?.height}
              className="mb-4 h-52 max-w-full object-cover md:mb-8"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          </Link>
        ) : null}
      </div>
      <CardContent>
        <CardTitle className="mb-4">{title}</CardTitle>
        <MetaBar recipe={{ tags }} id={id} />
      </CardContent>
      <CardFooter className="mt-auto">
        <Button asChild>
          <Link href={`/recipe/${generateSlug({ id, title })}`}>
            Go to recipe
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
