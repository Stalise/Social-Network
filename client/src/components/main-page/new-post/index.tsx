import { FC, FormEvent, useLayoutEffect, useRef, useState } from 'react';

import { sagaActionCreator, sagasConstantsPosts } from 'data/constants/saga';
import { dateHandler, transformFile } from 'helpers/common';
import { heightHandler } from 'helpers/post';
import { useAppDispatch, useAppSelector } from 'hooks/redux';

import { Loader } from 'components/common/loader';

import { FieldOverflowType, INewPostData, IPostState } from './types';

import s from './style.module.scss';

export const NewPost: FC = () => {

   const dispatch = useAppDispatch();
   const cloneField = useRef<HTMLDivElement | null>(null);

   const [fieldOverflow, setFieldOverflow] = useState<FieldOverflowType>('hidden');
   const [heightField, setHeightField] = useState<number>(70);
   const [post, setPost] = useState<IPostState>({
      text: '',
      img: '',
   });

   const { status } = useAppSelector(state => state.postsSlice);

   const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!post.img && !post.text) return;

      const postData: INewPostData = {
         text: post.text,
         img: '',
         date: dateHandler(),
      };

      if (typeof (post.img) !== 'string') {
         postData.img = await transformFile(post.img);
      }

      dispatch(sagaActionCreator<INewPostData>(sagasConstantsPosts.SAGA_USER_CREATE_POST, postData));
      setPost({ text: '', img: '' });
   };

   useLayoutEffect(() => {
      const cloneCurrentHeight = cloneField.current?.offsetHeight;

      if (cloneCurrentHeight !== undefined && cloneCurrentHeight !== heightField) {
         heightHandler(cloneCurrentHeight, heightField, setHeightField, setFieldOverflow, 220, 70);
      }
   });

   return (
      <form onSubmit={ submitHandler } className={ s.form }>
         { status === 'create' && <Loader /> }

         { status === 'ready' &&
            <>
               <div className={ s.text }>
                  <textarea
                     className={ `${s.textField} ${fieldOverflow === 'auto' ? s._auto : ''}` }
                     onChange={ e => setPost({ ...post, text: e.target.value }) }
                     value={ post.text }
                     placeholder="Write something..."
                     style={{ height: heightField + 'px' }}
                  >
                  </textarea>

                  <div ref={ cloneField } className={ s.textFieldClone }>{ post.text }</div>
               </div>
               <div className={ s.actions }>
                  <label className={ `${s.inputContainer} ${post.img ? s._active : ''}` }>
                     <input
                        className={ s.field }
                        type="file"
                        accept="image/jpeg, image/png"
                        onChange={ e => setPost({ ...post, img: e.target.files?.length ? e.target.files[0] : '' }) }
                     />
                  </label>

                  <button type="submit" className={ s.submit }>Publish</button>
               </div>
            </>
         }
      </form>
   );
};
