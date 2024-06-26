import React from "react";

const RichTextRenderer: React.FC<{ node: Content }> = ({ node }) => {
  switch (node.type) {
    case "paragraph":
      return (
        <p className="mb-4">
          {node.content?.map((n, i) => (
            <RichTextRenderer key={i} node={n} />
          ))}
        </p>
      );
    case "heading-1":
      return (
        <h1 className="text-3xl font-bold mb-4">
          {node.content?.map((n, i) => (
            <RichTextRenderer key={i} node={n} />
          ))}
        </h1>
      );
    case "heading-2":
      return (
        <h2 className="text-2xl font-bold mb-4">
          {node.content?.map((n, i) => (
            <RichTextRenderer key={i} node={n} />
          ))}
        </h2>
      );
    case "heading-3":
      return (
        <h3 className="text-xl font-bold mb-4">
          {node.content?.map((n, i) => (
            <RichTextRenderer key={i} node={n} />
          ))}
        </h3>
      );
    case "heading-4":
      return (
        <h4 className="text-lg font-bold mb-4">
          {node.content?.map((n, i) => (
            <RichTextRenderer key={i} node={n} />
          ))}
        </h4>
      );
    case "heading-5":
      return (
        <h5 className="text-md font-bold mb-4">
          {node.content?.map((n, i) => (
            <RichTextRenderer key={i} node={n} />
          ))}
        </h5>
      );
    case "heading-6":
      return (
        <h6 className="text-sm font-bold mb-4">
          {node.content?.map((n, i) => (
            <RichTextRenderer key={i} node={n} />
          ))}
        </h6>
      );
    case "unordered-list":
      return (
        <ul className="list-disc list-inside mb-4">
          {node.content?.map((n, i) => (
            <RichTextRenderer key={i} node={n} />
          ))}
        </ul>
      );
    case "ordered-list":
      return (
        <ol className="list-decimal list-inside mb-4">
          {node.content?.map((n, i) => (
            <RichTextRenderer key={i} node={n} />
          ))}
        </ol>
      );
    case "list-item":
      return (
        <li className="mb-2">
          {node.content?.map((n, i) => (
            <RichTextRenderer key={i} node={n} />
          ))}
        </li>
      );
    case "blockquote":
      return (
        <blockquote className="pl-4 border-l-4 border-gray-300 italic mb-4">
          {node.content?.map((n, i) => (
            <RichTextRenderer key={i} node={n} />
          ))}
        </blockquote>
      );
    case "hr":
      return <hr className="my-4" />;
    case "text":
      if (node.marks?.some((mark) => mark.type === "bold")) {
        return <strong>{node.value}</strong>;
      }
      if (node.marks?.some((mark) => mark.type === "italic")) {
        return <em>{node.value}</em>;
      }
      if (node.marks?.some((mark) => mark.type === "underline")) {
        return <u>{node.value}</u>;
      }
      return <span>{node.value}</span>;
    case "hyperlink":
      return (
        <a href={node.data.uri} className="text-blue-500 underline">
          {node.content?.map((n, i) => (
            <RichTextRenderer key={i} node={n} />
          ))}
        </a>
      );
    case "entry-hyperlink":
      return (
        <a
          href={`/entries/${node.data.target.sys.id}`}
          className="text-blue-500 underline"
        >
          {node.content?.map((n, i) => (
            <RichTextRenderer key={i} node={n} />
          ))}
        </a>
      );
    case "asset-hyperlink":
      return (
        <a
          href={node.data.target.fields.file.url}
          className="text-blue-500 underline"
        >
          {node.content?.map((n, i) => (
            <RichTextRenderer key={i} node={n} />
          ))}
        </a>
      );
    case "embedded-entry-block":
      return (
        <div className="embedded-entry-block mb-4">
          {/* Customize rendering of embedded entries here */}
        </div>
      );
    case "embedded-asset-block":
      return (
        <div className="embedded-asset-block mb-4">
          <img
            src={node.data.target.fields.file.url}
            alt={node.data.target.fields.title}
          />
        </div>
      );
    case "embedded-entry-inline":
      return (
        <span className="embedded-entry-inline">
          {/* Customize rendering of inline embedded entries here */}
        </span>
      );
    default:
      return null;
  }
};

export default RichTextRenderer;
