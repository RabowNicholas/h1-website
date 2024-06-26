interface PostData {
  slug: string;
  authorInfo: AuthorInfo;
  title: string;
  excerpt: string;
  createdAt: Date;
  coverImage: ImageType;
  content: Content[];
}

interface Content {
  type:
    | "document"
    | "paragraph"
    | "heading-1"
    | "heading-2"
    | "heading-3"
    | "heading-4"
    | "heading-5"
    | "heading-6"
    | "unordered-list"
    | "ordered-list"
    | "list-item"
    | "blockquote"
    | "hr"
    | "embedded-entry-block"
    | "embedded-asset-block"
    | "text"
    | "hyperlink"
    | "entry-hyperlink"
    | "asset-hyperlink"
    | "embedded-entry-inline";
  value?: any;
  content?: Content[];
  data?: any;
  marks?: Mark[];
}

interface Mark {
  type: "bold" | "italic" | "underline" | "code";
}
