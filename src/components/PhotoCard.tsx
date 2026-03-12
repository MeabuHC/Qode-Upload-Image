"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { MessageOutlined } from "@ant-design/icons";

interface PhotoCardProps {
  id: string;
  url: string;
  createdAt: string;
  commentCount?: number;
}

export default function PhotoCard({ id, url, createdAt, commentCount = 0 }: PhotoCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/photo/${id}`);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleClick}
    >
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
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500">
            {new Date(createdAt).toLocaleDateString()}
          </p>
          <div className="flex items-center gap-1 text-gray-600">
            <MessageOutlined style={{ fontSize: '14px' }} />
            <span className="text-xs font-medium">{commentCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
