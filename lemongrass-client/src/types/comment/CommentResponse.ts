export interface CommentResponse{
    id: string;
    recipeId?: string;
    postId?: string;
    // accountId: string;
    content: string;
    username: string;
    createdDate: string;
    updatedDate: string;
    replies: CommentResponse[];
}