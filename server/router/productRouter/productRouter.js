const express = require('express');
const productRouter = express.Router();
const db = require("../../db.js");
const url = require('url');
//npm run nodemons

//예시
//쿼리형태로 받음

//상품목록 동적쿼리 만드는 중
productRouter.get("/", async (request,response)=>{
  let data = [];
  let where = " WHERE 1=1";
  //const myURL = new URL(request.url, 'http://localhost:8081/');
  //console.log(myURL.search);
  //let keyword = myURL.searchParams.keyword;
  //let keyword = search.keyword;

  var queryData = url.parse(request.url, true).query;
  let keyword = queryData.keyword;
  let large_code = queryData.large_code;
  let small_code = queryData.small_code;
  let order = queryData.order;
  let limit = parseInt(queryData.limit);

  // 키워드(검색어) 있는 경우
  if(keyword){
    where += " AND p.prdt_name LIKE ? "
    data.push("%" + keyword + "%");
  }

  // 대분류(카테고리) 있는 경우
  if(large_code){
    where += " AND p.large_code = ? "
    data.push(large_code);
  }

  // 소분류(카테고리) 있는 경우
  if(small_code){
    where += " AND p.small_code = ? "
    data.push(small_code);
  }

  // ORDER BY 절 추가
  switch(order){
    case 'regis_dt' :
      where += " ORDER BY p.regis_dt DESC";
      break;
    case 'low_price':
      where += " ORDER BY p.sale_price";
      break;
    case 'high_price':
      where += " ORDER BY p.sale_price DESC";
      break;
    case 'dc_pct':
      where += " ORDER BY p.dc_pct";
      break;
    default :
      where += " ORDER BY d.sell DESC";
      break;
  }

  //목록중 일부(3개 or 6개)만 추출하고 싶을때
  if(limit){
    where += " LIMIT ?"
    console.log(where);
    data.push(limit);
  }

  let result = await db.connection('product','productList', data, where);
  response.send(result);

  // 오류 터미널창에 표시
  // let result = await db.connection('product','productList', data, where).then(res => {
  //   console.log(res)
  // })
  // .catch(err =>{
  //   console.log(err)
  // });
  // response.send(result);
});


// 재활용 할지말지 생각중~~~!
// // 메인 페이지 - 인기상품 3개 목록
// productRouter.get("/mainPopular", async (request,response)=>{
//   let result = await db.connection('product','mainPopularProductList');
//   response.send(result);
// });

// // 메인 페이지 - 신상품 6개 목록
// productRouter.get("/mainNew", async (request,response)=>{
//   let result = await db.connection('product','mainNewProductList');
//   response.send(result);
// }); 


// // 상품목록페이지 - 인기상품순 정렬 목록
// productRouter.get("/popular/:category", async (request,response)=>{
//   let data = request.params.category;
//   let result = await db.connection('product','popularProductList', data);
//   response.send(result);
// });

// // 상품목록페이지 - 신상품순/낮은가격순/높은가격순/할인율순 정렬 목록
// productRouter.get("/general/:large_code", async (request,response)=>{
//   let data = request.params.large_code;
//   let result = await db.connection('product','generalProductList', data);
//   response.send(result);
// });


// // 상품상세 페이지 - (이미지 제외) 상품정보
// productRouter.get("/info/:prdt_cd", async (request,response)=>{
//   let data = request.params.prdt_cd;
//   let result = await db.connection('product','productInfo', data)[0];
//   response.send(result);
// });

// // 상품상세 페이지 - 나머지 이미지들
// productRouter.get("/infoImages/:prdt_cd", async (request,response)=>{
//   let data = request.params.prdt_cd;
//   let result = await db.connection('product','productInfoImages', data);
//   response.send(result);
// });

// // 상품상세 페이지 - 상품의 옵션들 목록
// productRouter.get("/infoOptions/:prdt_cd", async (request,response)=>{
//   let data = request.params.prdt_cd;
//   let result = await db.connection('product','productInfoOptions', data);
//   response.send(result);
// });







module.exports = productRouter;