"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import PhotoUpload from "@/components/PhotoUpload";
import PhotoGrid from "@/components/PhotoGrid";

interface Photo {
  id: string;
  url: string;
  createdAt: string;
}

export default function Home() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const response = await fetch("/api/photos");
      const data = await response.json();
      setPhotos(data);
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = (photo: Photo) => {
    setPhotos([photo, ...photos]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Header />
        <PhotoUpload onUpload={handleUpload} />

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Recent Photos
          </h2>
          {loading ? (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <p className="text-gray-500">Loading photos...</p>
            </div>
          ) : (
            <PhotoGrid photos={photos} />
          )}
        </div>
      </div>
    </div>
  );
}
