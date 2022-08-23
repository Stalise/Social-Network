import styled from 'styled-components';

export const Wrapper = styled.div`
   max-width: 100%;
   width: 100%;
   background-color: #ffffff;
   border-radius: 10px;
   display: grid;
   grid-template-columns: repeat(auto-fill, minmax(170px, 170px));
   // grid-template-columns: repeat(5, minmax(130px, 170px));
   grid-template-rows: auto;
   gap: 30px 20px;
   justify-content: center;
`;
