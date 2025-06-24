// export type FeedType = 'POST' | 'RECIPE';

// export interface Tag {
//   name: string;
//   color: string;
// }

// export interface ImageResponse {
//   // Điều chỉnh nếu có thêm field
//   url?: string;
//   alt?: string;
// }

// export interface IngredientShortResponse {
//   name: string | null;
//   quatity: string | null; // Giữ nguyên từ backend, hoặc sửa lại thành `quantity` nếu backend cập nhật
// }

// export interface AccountShortResponse {
//   id: string;
//   username: string;
//   firstName: string;
//   lastName: string;
//   profilePictureUrl: string | null;
// }

// export interface FeedItem {
//   id: string;
//   type: FeedType;
//   createAt: string; // ISO string
//   title: string;
//   content: string | null;
//   category: string | null;
//   difficulty: 'EASY' | 'MEDIUM' | 'HARD' | null;
//   tags: Tag[] | null;
//   cookingTime: number | null;
//   servings: number | null;
//   rating: number | null;
//   imageResponses: ImageResponse[];
//   ingredientShortResponses: IngredientShortResponse[] | null;
//   isVerified: boolean | null;
//   accountShortResponse: AccountShortResponse | null;
// }

// export interface FeedResponse {
//   code: number;
//   result: FeedItem[];
// }
