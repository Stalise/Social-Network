import { FC } from 'react';

import "./style.scss";

export const Loader: FC = () => (
   <div className="container" data-test-id="loader-spinner">
      <div id="floatingCirclesG">
         <div className="f_circleG" id="frotateG_01"></div>
         <div className="f_circleG" id="frotateG_02"></div>
         <div className="f_circleG" id="frotateG_03"></div>
         <div className="f_circleG" id="frotateG_04"></div>
         <div className="f_circleG" id="frotateG_05"></div>
         <div className="f_circleG" id="frotateG_06"></div>
         <div className="f_circleG" id="frotateG_07"></div>
         <div className="f_circleG" id="frotateG_08"></div>
      </div>
   </div>
);
