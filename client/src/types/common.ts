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

export interface IPhoto {
   id: number,
   img: string,
}

export type FriendStatusType = 'no' | 'friend' | 'request' | 'sent';

export type TabsType = 'tab-1' | 'tab-2';

export interface ILike {
   username: string,
   postId: number,
}

export interface IChat {
   id: number,
   username: string,
   forename: string,
   surname: string,
   avatar: string,
   messages: IMessage[]
}

export interface IMessage {
   id: number,
   text: string,
   date: string,
   avatar: string,
   name: string,
   surname: string,
}

export interface ISearchUser {
   username: string,
   name: string,
   surname: string,
   avatar: string,
}

export interface IMessageDateSections {
   [section: string]: IMessage[];
}
