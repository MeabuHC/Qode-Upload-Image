"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Button, Input, List, Avatar, Spin } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import { Photo } from "@/types";

export default function PhotoDetail() {
  const params = useParams();
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const response = await fetch(`/api/photos/${params.id}`);
        const data = await response.json();
        setPhoto(data);
      } catch (error) {
        console.error("Error fetching photo:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchPhoto();
    }
  }, [params.id]);

  const handleComment = async () => {
    if (!commentText.trim() || !photo) return;

    setSubmitting(true);
    try {
      const response = await fetch(`/api/photos/${photo.id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: commentText }),
      });

      if (response.ok) {
        const newComment = await response.json();
        setPhoto({
          ...photo,
          comments: [...photo.comments, newComment],
        });
        setCommentText("");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (!photo) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Photo not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Button
          type="default"
          onClick={() => window.history.back()}
          className="mb-6"
        >
          ← Back to Gallery
        </Button>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="relative w-full h-96 mb-4">
            <Image
              src={photo.url}
              alt="Photo"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
            />
          </div>
          <p className="text-sm text-gray-500">
            Uploaded on {new Date(photo.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <MessageOutlined className="mr-2" />
            Comments ({photo.comments.length})
          </h3>

          <div className="mb-6">
            <div className="flex gap-2">
              <Input.TextArea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment..."
                rows={3}
                className="flex-1"
              />
              <Button
                type="primary"
                onClick={handleComment}
                loading={submitting}
                disabled={!commentText.trim()}
              >
                Post
              </Button>
            </div>
          </div>

          {photo.comments.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No comments yet. Be the first to comment!
            </p>
          ) : (
            <List
              dataSource={photo.comments}
              renderItem={(comment) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<MessageOutlined />} />}
                    title={
                      <span className="text-sm">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    }
                    description={comment.content}
                  />
                </List.Item>
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
}
