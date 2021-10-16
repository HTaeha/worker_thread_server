// import firebaseAdmin from "../config/firebase";
// import { handlingError } from "./errorHandler";
// import jwt from "jsonwebtoken";
// import { JWT_SECRET } from "../util/secrets";
// import axios from "axios";

// export const verifyPhoneAuth = async (phoneToken: string): Promise<any> => {
//     const result = await firebaseAdmin.auth().verifyIdToken(phoneToken)
//     .then(decodedToken => {
//         console.log("verify success");
//         return decodedToken;
//     }).catch(error => {
//         console.log(error);
//         // handlingError("", 500,"","","",error,"verifyToken");
//         return false;
//     });

//     return result;
// };



// export const getTokenDetail = async (uid: string): Promise<any> => {
    
//     const detailedToken = await firebaseAdmin.auth().getUser(uid)
//     .then(userinfo => {
//         return userinfo;
//     })
//     .catch(err =>{
//         console.log(err);
//         // handlingError("", 500,"","","",err,"getTokenDetail");
//         return false;
//     });

//     return detailedToken;
// };

// export const naverTokenCheck = async(token : string) =>  {
//     console.log("naver verify");
//     const api_url = "https://openapi.naver.com/v1/nid/me";
 
//     try {
//         const getToken = await axios({
//             url: api_url,
//             method: "get", 
//             headers: {"Authorization": "Bearer "+token},
//           });
//         const result = getToken.data.response;
        
//         const tokenInfo = {
//             id : result.id,
//             email : result.email,
//             provider : "naver"
//         };
//         return tokenInfo;    
//     } catch (error) {
//         if(error.response.status == 401) return "expired";
//         return false;
//     }
// };

// export const kakaoTokenCheck = async(token : string) => {
//     console.log("kakao verify");
//     // let header = "Bearer " + token; 
//     const api_url = "https://kapi.kakao.com/v2/user/me";
    
//     try {
//         const getToken = await axios({
//             url: api_url,
//             method: "get", 
//             headers: {"Authorization": "Bearer "+token},
//         });
//         const result = getToken.data;
        
//         const tokenInfo = {
//             id : result.id,
//             email : result.kakao_account.email,
//             provider : "kakao"
//         };
//         return tokenInfo;    
//     } catch (error) {
//         if(error.response.status == 401) return "expired";
//         return false;
//     }
// };

// export const emailTokenCheck = async(btoken : string) =>{
//     console.log("email verify");
    
//     try {
//         const token:any = jwt.verify(
//              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9."+btoken, 
//             JWT_SECRET);

//         const tokenInfo = {
//             id : token.id,
//             email : token.email,
//             provider : "email",
//             subject : token.sub,
//             expiresIn : Number(token.exp+"000"),
//             sender : token.sender
//         };
//         return tokenInfo;
//     } catch (error) {
//         console.log(error);
//         return "expired";
//     } 
   
// };


// export const appleTokenCheck = async(btoken : string) =>{
//     console.log("apple verify");
    
//     try {
//         const token:any = jwt.decode(btoken);
        
//         const tokenInfo = {
//             id : token.sub,
//             email : token.email,
//             provider : "apple"
//         };
//         return tokenInfo;
//     } catch (error) {
//         console.log(error);
//         return "expired";
//     } 
   
// };

// export const tokenVerifier =async (provider:string, token: string) => {
//     if(provider == "naver")
//         return naverTokenCheck(token);
//     else if(provider == "kakao")
//         return kakaoTokenCheck(token);
//     else if(provider == "email"){
//         return emailTokenCheck(token);
//     }
//     else if(provider == "apple")
//         return appleTokenCheck(token);
// };
    

// export const makeJWT = async (id:string, email:string, name:string, subject:string, exp:string, sender:string) =>{
//    console.log("make JWT");
//     const token = jwt.sign(
//         {
//             id: id,
//             name: name,
//             email : email,
//             sender : sender
//         }, 
//         JWT_SECRET, 
//         {
//             expiresIn: exp,
//             issuer: "linecare.net",
//             subject: subject,
//         }
//     );
//     const temp = token.split(".");
//     return temp[1]+"."+temp[2];
// };