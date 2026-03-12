"use client";

import Image from "next/image";

interface PhotoCardProps {
  url: string;
  createdAt: string;
}

export default function PhotoCard({ url, createdAt }: PhotoCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative w-full h-48">
        <Image
          src={url}
          alt="Uploaded photo"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>
      <div className="p-3">
        <p className="text-xs text-gray-500">
          {new Date(createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
