export interface ContentCreate {
  text: string;
  contentTitle: string;
  displayOrder: number;
  file?: File;
}
export interface PostCreate {
  title: string;
  mainContents: string;
  contents: ContentCreate[];
  visibility: "PUBLIC";
}