export interface PostCreate {
  visibility: string;
  title: string;
  content: string;
  images: {
    file: File;
    displayOrder: number;
  }[];
}
