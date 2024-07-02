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
      <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-cool-white">
        <div className="flex items-center p-4">
          <Image
            src={authorInfo.avatarImage.src}
            alt={authorInfo.avatarImage.alt}
            width={25}
            height={25}
            className="rounded-full"
          />
          <div className="ml-4">
            <span className="font-semibold text-dark-black">
              {authorInfo.authorName}
            </span>
            <br />
            <span className="text-sm text-slate-gray">
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
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-xl font-bold text-dark-black">{title}</h2>
          <p className="text-slate-gray mt-2">{excerpt}</p>
        </div>
      </div>
    </Link>
  );
}
