import { GetRecipeList } from "@/app/page";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { Rating } from "./Rating";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "./ui/card";

export function RecipeCard({
  title,
  description,
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
          <Image
            src={`https:${photo.fields.file.url}`}
            alt={title}
            width={photo.fields.file.details.image?.width}
            height={photo.fields.file.details.image?.height}
            className="mb-4 h-52 max-w-full object-cover md:mb-8"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        ) : null}
      </div>
      <CardContent>
        <CardTitle className="mb-4">{title}</CardTitle>
        <div className="my-4 flex flex-row items-center">
          <Rating className="mr-4" id={id} />
          {Array.isArray(tags) && tags[0] ? (
            <Badge>{tags[0]?.fields.name}</Badge>
          ) : null}
        </div>
        <ReactMarkdown>{description}</ReactMarkdown>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button asChild>
          <Link href={`/recipe/${title.replaceAll(" ", "-")}-${id}`}>
            Go to recipe
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
