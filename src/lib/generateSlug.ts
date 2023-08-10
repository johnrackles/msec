type Args = { title: string; id: string };

export function generateSlug({ title, id }: Args) {
  if (title.length === 0) {
    return id;
  }

  return `${title
    .toLowerCase()
    .split(" ")
    .join("-")
    .replace(/[^a-z0-9-]/g, "")}-${id}`;
}
