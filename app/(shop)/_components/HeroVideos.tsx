import { client } from "@/app/lib/contentful/client";
import React from "react";

export default async function VideoGrid() {
  const data = await client.getEntries({ content_type: "heroContent" });
  const videos: string[] = data.items.map(
    (i: any) => `https:${i.fields.content.fields.file.url}`
  );

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 w-full">
        {videos.map((video, index) => (
          <div key={index} className="w-full h-full">
            <video className="w-full h-full" autoPlay loop muted playsInline>
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </div>
    </div>
  );
}
