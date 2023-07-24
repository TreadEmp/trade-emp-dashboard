// @ts-ignore
import styled from "styled-components";
import { styled as BaseStyled } from "baseui";

// export const Wrapper = styled.div`
//   font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
//     Ubuntu, Cantarell, "Outfit", "Helvetica Neue", sans-serif;
//   margin: 0 auto;
//   position: relative;
// `;

export const Wrapper = BaseStyled("div", () => ({
  fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Outfit", "Helvetica Neue", sans-serif`,
  // margin: "0 auto",
  position: "relative",
  width: "100%",
}));

// export const Input = styled('input', () => ({
//   width: "400px",
//   background: "#f1f1f1",
//   border: "none",
//   padding: "10px 20px 10px 30px",
//   borderRadius: "10px 10px 10px 10px",
//   position: "relative",
//   display: "grid",
//   justifySelf: "center",
//   '&:focus' : {
//     outline: "none",
//     borderRadius: "10px"
//   },
//   '::placeholder': {
//         paddingLeft: "10px"
//   }
// }))

// export const Input = styled('input', () => ({
//   width: "400px",
//   background: "#f1f1f1",
//   border: "none",
//   padding: "10px 20px 10px 30px",
//   borderRadius: "10px 10px 10px 10px",
//   position: "relative",
//   display: "grid",
//   justifySelf: "center",
//   position: "relative",
//   `&:focus` : {
//     outline: "none",
//     border-radius: "10px 10px 10px 10px"
//   },
//   `::placeholder` : {
//     paddingLeft: "10px"
//   }
// }))

export const Input = styled.input`
  background: #f1f1f1;
  border: none;
  padding: 10px 20px 10px 30px;
  border-radius: 10px 10px 10px 10px;
  position: relative;
  display: grid;
  justify-self: center;
  position: relative;
  width: 90%;
  &:focus {
    outline: none;
    border-radius: 10px 10px 10px 10px;
  }
  ::placeholder {
    padding-left: 10px;
  }
  
  @media only screen and (max-width: 768px) {
  background: #FFFFFF;
  border: 1px solid #E3EAF0;
  width: 80%;
  },
`;

export const SuggestionWrapper = BaseStyled("div", () => ({
  background: "#f1f1f1",
  display: "flex",
  flexDirection: "column",
  zindex: "-1000",
  // width: "400px",
  padding: "10px 20px",
  marginTop: "50px",
  borderRadius: "10px 10px 10px 10px",
  position: "absolute",
  top: "-7px",
  left: "0",
  zIndex: "1",
  maxWidth: "50vw",
}));

// export const SuggestionWrapper = styled.div`
//   background: #f1f1f1;
//   position: relative;
//   display: "flex";
//   zindex: -1000;
//   width: 400px;
//   padding: 10px 20px;
//   margin-top: 50px;
//   border-radius: 10px 10px 10px 10px;
//   position: absolute;
//   top: -7px;
//   left: 0;
//   z-index: 1;
// `;

// export const Suggestion = styled.p`
//   cursor: pointer;
//   max-width: 400px;
// `;

export const Suggestion = BaseStyled("p", ({ $theme }) => ({
  cursor: "pointer",
  width: "400px",
  maxWidth: "50vw",
  [`@media only screen and (max-width: ${$theme.breakpoints.xxl})`]: {
    fontSize: "16px",
  },
}));
