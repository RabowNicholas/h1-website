import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function PostPreviewTile({
  postData,
}: {
  postData: PostPreviewData;
}) {
  const { slug, authorInfo, title, excerpt, createdAt, coverImage } = postData;

  return (
    <Link href={`/educate/${slug}`}>
      <div>
        <Image
          src={authorInfo.avatarImage.src}
          alt={authorInfo.avatarImage.alt}
          width={25}
          height={25}
        />
        <div>
          <span>{authorInfo.authorName}</span>
          <br />
          <span>
            {new Date(createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </div>
      <Image
        src={coverImage.src}
        alt={coverImage.alt}
        height={200}
        width={200}
      />
      <div>
        <h2>{title}</h2>
        <p>{excerpt}</p>
      </div>
    </Link>
  );
}
