export type PostResponse = {
  id: number;
  title: string;
  preview: string;
  tags: string;
  date: string;
};
export type PostPreviewType = {
  id: number;
  title: string;
  preview: string;
  tags: string[];
  date: string;
};
export type PostDetailResponse = {
  id: number;
  title: string;
  preview: string;
  tags: string;
  date: string;
  comments: string;
  markdown: string;
};
export type PostDetailType = {
  id: number;
  title: string;
  preview: string;
  tags: string[];
  date: string;
  comments: CommentType[];
  markdown: string;
};
export type CommentType = {
  ip: string;
  nickname: string;
  password: string;
  comment: string;
  date: string;
};
export type TagResponse = {
  name: string;
  postIDs: string;
};
export type TagType = {
  name: string;
  count: number;
};
