"use client";

import { useState } from "react";
import Image from "next/image";
import { Button, message } from "antd";
import { Photo } from "@/types";

interface PhotoUploadProps {
  onUpload: (photo: Photo) => void;
}

export default function PhotoUpload({ onUpload }: PhotoUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        onUpload({ ...result.photo, comments: [] });
        setSelectedFile(null);
        setPreview("");
        message.success("Photo uploaded successfully!");
      } else {
        message.error(result.error || "Failed to upload photo");
      }
    } catch (error) {
      console.error("Upload error:", error);
      message.error("Failed to upload photo");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
      <div className="flex flex-col items-center">
        <div className="w-full max-w-md">
          <label className="block mb-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
              {preview ? (
                <div className="relative mx-auto h-48 w-full mb-4 flex items-center justify-center">
                  <Image
                    src={preview}
                    alt="Preview"
                    fill
                    className="object-contain rounded-lg"
                  />
                </div>
              ) : (
                <div>
                  <p className="text-gray-600 mb-2">Click to upload a photo</p>
                  <p className="text-sm text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              )}
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileSelect}
              />
            </div>
          </label>

          {selectedFile && (
            <Button
              type="primary"
              onClick={handleUpload}
              className="w-full"
              loading={uploading}
            >
              {uploading ? "Uploading..." : "Upload Photo"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
