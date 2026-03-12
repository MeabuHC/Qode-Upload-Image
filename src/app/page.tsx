"use client";

import { useState, useEffect, useMemo } from "react";
import { Pagination } from "antd";
import Header from "@/components/Header";
import PhotoUpload from "@/components/PhotoUpload";
import PhotoGrid from "@/components/PhotoGrid";
import { Photo } from "@/types";

const ITEMS_PER_PAGE = 8;

export default function Home() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

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
    setCurrentPage(1);
  };

  const paginatedPhotos = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return photos.slice(startIndex, endIndex);
  }, [photos, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
            <>
              <PhotoGrid photos={paginatedPhotos} />
              {photos.length > ITEMS_PER_PAGE && (
                <div className="flex justify-center mt-8">
                  <Pagination
                    current={currentPage}
                    total={photos.length}
                    pageSize={ITEMS_PER_PAGE}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
