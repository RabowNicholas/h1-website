import { client } from "../lib/contentful/client";
import PostPreviewTile from "./_components.tsx/PostPreviewTile";

export default async function Page() {
  const data = await getData();
  return (
    <div>
      {data.items.map((i: any) => {
        return (
          <PostPreviewTile
            key={i.fields.slug}
            postData={{
              slug: i.fields.slug,
              authorInfo: {
                authorName: i.fields.author.fields.name,
                avatarImage: {
                  src: `https:${i.fields.author.fields.picture.fields.file.url}`,
                  alt: "blog post author avatar image",
                },
              },
              title: i.fields.title,
              excerpt: i.fields.excerpt,
              createdAt: new Date(i.fields.createdAt),
              coverImage: {
                src: `https:${i.fields.coverImage.fields.file.url}`,
                alt: i.fields.coverImage.fields.title,
              },
            }}
          />
        );
      })}
    </div>
  );
}

async function getData() {
  return await client.getEntries({ content_type: "post" });
}
