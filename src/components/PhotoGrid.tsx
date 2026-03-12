"use client";

import PhotoCard from "./PhotoCard";
import { PictureOutlined } from "@ant-design/icons";
import { Photo } from "@/types";

interface PhotoGridProps {
  photos: Photo[];
}

export default function PhotoGrid({ photos }: PhotoGridProps) {
  if (photos.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
        <PictureOutlined style={{ fontSize: '48px', color: '#9CA3AF', marginBottom: '16px' }} />
        <p className="text-gray-500">
          No photos yet. Upload your first photo above!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {photos.map((photo) => (
        <PhotoCard
          key={photo.id}
          id={photo.id}
          url={photo.url}
          createdAt={photo.createdAt}
          commentCount={photo.comments.length}
        />
      ))}
    </div>
  );
}
