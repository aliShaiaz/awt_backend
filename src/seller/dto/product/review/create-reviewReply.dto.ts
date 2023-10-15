export class CreateReviewReplyDto {
  replyId ? : number;
  replyDetails: string;
  reviewId: number;// The ID of the associated review
  // parentReplyId?: number | null; // The ID of the parent reply (or null if it's a top-level reply)
  // The ID of the parent reply (or null if it's a top-level reply)
  // parentReplyId -> from chatgpt 
  //childReplies: any[];
  /**
   * childReplies exist e kore na first time 
   * reviewReply create korar shomoy
   * but bujhlam na 😥
   */
}