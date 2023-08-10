import * as contentful from "contentful";
import invariant from "tiny-invariant";

type Tag = {
  contentTypeId: "ContentType";
  fields: { name: string };
};

export type RecipeEntrySkelton = {
  contentTypeId: "recipe";
  fields: {
    title: contentful.EntryFieldTypes.Text;
    photo: contentful.EntryFieldTypes.AssetLink;
    description: contentful.EntryFieldTypes.Text;
    tags: contentful.EntryFieldTypes.Array<
      contentful.EntryFieldTypes.EntryLink<Tag>
    >;
  };
};

invariant(
  process.env.CONTENTFUL_SPACE_ID,
  "CONTENTFUL_SPACE_ID is not defined in",
);
invariant(
  process.env.CONTENTFUL_ACCESS_TOKEN,
  "CONTENTFUL_ACCESS_TOKEN is not defined",
);

export const api = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  environment: "master",
});
