export interface IUserData {
   username: string,
   name: string,
   surname: string,
   birth: string,
   city: string,
   avatar: string,
}

export interface IPost {
   id: number,
   text: string,
   img: string,
   date: string,
   likes: number,
   user_username: string,
   isLike: boolean,
}

export interface IFriend {
   username: string,
   name: string,
   surname: string,
   avatar: string,
   status: FriendStatusType,
}

export type FriendStatusType = "no" | "friend" | "request" | "sent"

export interface ILike {
   username: string,
   postId: number,
}