type InstaCloneUser = {
    id: string;
    userCreatedUsername: string;
    profilePicture: string;
};
  
type Comment = {
    id: number;
    content: string;
    created: string;
    instaCloneUser: InstaCloneUser;
};
  
type Like = {
    id: number;
    instaCloneUser: InstaCloneUser;
};
  
type Post = {
    id: number;
    fileAddress: string;
    caption: string;
    created: string;
    instaCloneUser: InstaCloneUser;
    comments: Comment[];
    likes: Like[];
};
  

export type { InstaCloneUser, Comment, Like, Post };