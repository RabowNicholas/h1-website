interface PostPreviewData {
  slug: string;
  authorInfo: AuthorInfo;
  title: string;
  excerpt: string;
  createdAt: Date;
  coverImage: ImageType;
}

interface AuthorInfo {
  authorName: string;
  avatarImage: ImageType;
}
