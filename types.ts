
export interface Author {
  name: string;
  avatar: string;
  role: string;
}

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: Author;
  date: string;
  category: string;
  readTime: string;
}

export interface AIState {
  isGenerating: boolean;
  error: string | null;
  generatedContent: string;
}
