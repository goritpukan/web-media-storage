export interface IVideoPreview {
  id: string;
  name: string;
  author:{
    firstName: string;
    lastName: string;
  }
  duration: number;
  previewUrl: string;
  createdAt: Date;
}
export interface IVideo {
  id: string;
  name: string;
  description: string;
  authorId: string;
  videoUrl: string;
}
