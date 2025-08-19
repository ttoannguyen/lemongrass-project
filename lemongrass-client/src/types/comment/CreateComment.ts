export interface CreateComment{
    recipeId?: string;
    postId?: string;
    accountId: string | '';
    content: string;
    parentCommentId?: string;
}