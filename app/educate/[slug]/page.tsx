import RichTextRenderer from "@/app/_components/common/RichTextRenderer";
import { client } from "@/app/lib/contentful/client";

export default async function page({ params }: { params: { slug: string } }) {
  const data = await getData(params.slug);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center mb-4">
        <img
          src={data.authorInfo.avatarImage.src}
          alt={data.authorInfo.avatarImage.alt}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <h2 className="text-xl font-bold">{data.authorInfo.authorName}</h2>
          <p className="text-gray-600">
            {new Date(data.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      <img
        src={data.coverImage.src}
        alt={data.coverImage.alt}
        className="w-full h-auto mb-4"
      />
      <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
      <p className="text-gray-700 mb-6">{data.excerpt}</p>
      <div>
        {data.content.map((node, index) => (
          <RichTextRenderer key={index} node={node} />
        ))}
      </div>
    </div>
  );
}

export async function getData(slug: string): Promise<PostData> {
  const res = await client.getEntries({
    content_type: "post",
    "fields.slug": slug,
  });

  const item = res.items[0];
  return {
    slug: item.fields.slug,
    authorInfo: {
      authorName: item.fields.author.fields.name,
      avatarImage: {
        src: `https:${item.fields.author.fields.picture.fields.file.url}`,
        alt: "blog post author avatar image",
      },
    },
    title: item.fields.title,
    excerpt: item.fields.excerpt,
    createdAt: new Date(item.fields.createdAt),
    coverImage: {
      src: `https:${item.fields.coverImage.fields.file.url}`,
      alt: item.fields.coverImage.fields.title,
    },
    content: parseContent(item.fields.content.content),
  };
}

function parseContent(contentArray: any[]): Content[] {
  return contentArray.map((node: any) => {
    const baseContent: Content = {
      type: node.nodeType,
      value: node.value || null,
      content: node.content ? parseContent(node.content) : [],
      data: node.data || null,
      marks: node.marks || null,
    };

    if (node.nodeType === "text") {
      baseContent.value = node.value;
    } else if (
      node.nodeType === "hyperlink" ||
      node.nodeType === "entry-hyperlink" ||
      node.nodeType === "asset-hyperlink"
    ) {
      baseContent.data = node.data;
    } else if (
      node.nodeType === "embedded-entry-block" ||
      node.nodeType === "embedded-asset-block" ||
      node.nodeType === "embedded-entry-inline"
    ) {
      baseContent.data = node.data;
    }

    return baseContent;
  });
}
