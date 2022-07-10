import { FC, useLayoutEffect, useRef, useState, FormEvent } from "react";

import s from "./NewPost.module.scss";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { heightHandler } from "helpers/postHelpers";
import { transformFile, dateHandler } from "helpers/commonHelpers";
import { sagasConstantsPosts, sagaActionCreator } from "mock/constants/saga";
import { IPostState, INewPostData, FieldOverflowType } from "./types";

import Loader from "components/Common/Loader/Loader";

const NewPost: FC = () => {

   const dispatch = useAppDispatch();
   const { status } = useAppSelector(state => state.postsSlice);
   const cloneField = useRef<HTMLDivElement | null>(null);

   const [fieldOverflow, setFieldOverflow] = useState<FieldOverflowType>("hidden");
   const [heightField, setHeightField] = useState<number>(70);
   const [post, setPost] = useState<IPostState>({
      text: "",
      img: "",
   });

   const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!post.img && !post.text) return;

      const postData: INewPostData = {
         text: post.text,
         img: "",
         date: dateHandler(),
      };

      if (typeof (post.img) !== "string") {
         postData.img = await transformFile(post.img);
      }

      dispatch(sagaActionCreator<INewPostData>(sagasConstantsPosts.SAGA_USER_CREATE_POST, postData));
      setPost({ text: "", img: "" });
   };

   useLayoutEffect(() => {
      const cloneCurrentHeight = cloneField.current?.offsetHeight;

      if (cloneCurrentHeight !== undefined && cloneCurrentHeight !== heightField) {
         heightHandler(cloneCurrentHeight, heightField, setHeightField, setFieldOverflow, 220, 70);
      }
   });

   return (
      <form onSubmit={ submitHandler } className={ s.form }>
         { status === "create" && <Loader /> }

         { status === "ready" &&
            <>
               <div className={ s.text }>
                  <textarea
                     className={ `${s.textField} ${fieldOverflow === "auto" ? s._auto : ""}` }
                     onChange={ e => setPost({ ...post, text: e.target.value }) }
                     value={ post.text }
                     placeholder="Write something..."
                     style={{ height: heightField + "px" }}
                  >
                  </textarea>

                  <div ref={ cloneField } className={ s.textFieldClone }>{ post.text }</div>
               </div>
               <div className={ s.actions }>
                  <label className={ `${s.inputContainer} ${post.img ? s._active : ""}` }>
                     <input
                        className={ s.field }
                        type="file"
                        accept="image/jpeg, image/png"
                        onChange={ e => setPost({ ...post, img: e.target.files?.length ? e.target.files[0] : "" }) }
                     />
                  </label>

                  <button type="submit" className={ s.submit }>Publish</button>
               </div>
            </>
         }
      </form>
   );
};

export default NewPost;
