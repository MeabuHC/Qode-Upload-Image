export interface Comment {
  id: string;
  content: string;
  createdAt: string;
}

export interface Photo {
  id: string;
  url: string;
  createdAt: string;
  comments: Comment[];
}
