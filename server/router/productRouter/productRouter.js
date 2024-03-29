const express = require('express');
const productRouter = express.Router();
const db = require("../../db.js");
const { productCount } = require('../../db/product/product.js');
//npm run nodemons

//예시
//쿼리형태로 받음

// 상품목록 동적쿼리
productRouter.post("/", async (request,response)=>{

  let limit = parseInt(request.body.param.limit);
  let offset = parseInt(request.body.param.offset);
  let searched = request.body.param.searched;
  let large_code = request.body.param.large_code;
  let small_code = request.body.param.small_code;
  let order = request.body.param.order;

  let checkSearch = request.body.param.checkSearch;
  let getDate1 = request.body.param.getDate1;
  let getDate2 = request.body.param.getDate2;
  let checkDate = request.body.param.checkDate;


  let data = [];
  let where = " WHERE 1=1";


  // 키워드(검색어) 있는 경우
  // if(keyword){
  //   where += " AND p.prdt_name LIKE ? "
  //   data.push("%" + keyword + "%");
  // }
  if(searched){
    if(checkSearch == "1"){
      where += " AND p.prdt_name LIKE ? "
      data.push("%" + searched + "%");
    } else if(checkSearch == "2"){
      where += " AND p.brand LIKE ? "
      data.push("%" + searched + "%");
    } else if(checkSearch == "3") { //user검색 기능에서 사용...카테고리 넣고 싶으면 동적쿼리 새로 만들어야...
      where += " AND p.prdt_name LIKE ? OR p.brand LIKE ?"
    }
  }

  // 등록일/수정일 있는 경우
  if(getDate1 && getDate2){
    if(checkDate == "1"){
      where += " AND p.regis_dt BETWEEN ? AND ?"
      data.push(getDate1, getDate2);
    } else if(checkDate == "2"){
      where += " AND p.modify_dt BETWEEN ? AND ?"
      data.push(getDate1, getDate2);
    }
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
      where += " ORDER BY p.dc_pct DESC";
      break;
    default :
      where += " ORDER BY d.sell DESC";
      break;
  }

  // //목록중 일부(3개 or 6개)만 추출하고 싶을때
  // if(limit){
  //   where += " LIMIT ?"
  //   console.log(where);
  //   data.push(limit);
  // }

  // LIMIT / OFFSET 절 추가

  where += " LIMIT ?"
  data.push(limit);

  if(offset){
    where += " OFFSET ?"
    data.push(offset);    
  }

  let result = await db.connection('product','productList', data, where).catch((err)=> console.log(err));
  console.log(result);
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


productRouter.post("/productCount", async (request, response)=>{
  let searched = request.body.param.searched;
  let large_code = request.body.param.large_code;
  let small_code = request.body.param.small_code;

  let checkSearch = request.body.param.checkSearch;
  let getDate1 = request.body.param.getDate1;
  let getDate2 = request.body.param.getDate2;
  let checkDate = request.body.param.checkDate;


  let data = [];
  let where = " WHERE 1=1";

  // 키워드(검색어) 있는 경우
  if(searched){
    if(checkSearch == "1"){
      where += " AND p.prdt_name LIKE ? "
      data.push("%" + searched + "%");
    } else if(checkSearch == "2"){
      where += " AND p.brand LIKE ? "
      data.push("%" + searched + "%");
    } else if(checkSearch == "3") { //user검색 기능에서 사용...카테고리 넣고 싶으면 동적쿼리 새로 만들어야...
      where += " AND p.prdt_name LIKE ? OR p.brand LIKE ?"
    }
  }

  // 등록일/수정일 있는 경우
  if(getDate1 && getDate2){
    if(checkDate == "1"){
      where += " AND p.regis_dt BETWEEN ? AND ?"
      data.push(getDate1, getDate2);
    } else if(checkDate == "2"){
      where += " AND p.modify_dt BETWEEN ? AND ?"
      data.push(getDate1, getDate2);
    }
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

  let result = await db.connection('product', 'productCount', data, where).catch((err)=> console.log(err));
  response.send(result);
})

// 상품상세 페이지 - (이미지 제외) 상품정보
productRouter.get("/productInfo/:prdt_cd", async (request,response)=>{
  let data = request.params.prdt_cd;
  let result = await db.connection('product','productInfo', data);
  response.send(result[0]);
  //console.log('결과는 ' + result);
});

// 상품상세 페이지 - 상품의 옵션들 목록
productRouter.get("/productOptions/:prdt_cd", async (request,response)=>{
  let data = request.params.prdt_cd;
  let result = await db.connection('product','productOptions', data);
  response.send(result);
});

// 상품상세 페이지 - 나머지 이미지들
productRouter.get("/productImages/:prdt_cd", async (request,response)=>{
  let data = request.params.prdt_cd;

  let result = await db.connection('product','productImages', data);
  console.log('상품이미지result : ' + result[0]);
  response.send(result);
});

// 상품상세 페이지에서 선택한 상품들 장바구니에 담기
productRouter.post("/insertCart", async (request, response)=>{
  let data = request.body.param;
  let result = '';
  for(let i in data){
    result = await db.connection('product','insertCart', data[i])
    .catch(err => console.log(err));
  }
  response.send(result);
});

// 상품번호조회(관리자)
productRouter.get("/productCode/:prdt_cd", async (request,response)=>{
  let data = request.params.prdt_cd+"%";
  let result = await db.connection('product','productCode', data);
  response.send(result);
});


module.exports = productRouter;