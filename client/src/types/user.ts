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
   name: string,
   surname: string,
   img_user: string,
   text: string,
   date: string,
   img_post: string,
   likes: number,
   user_id: number,
}