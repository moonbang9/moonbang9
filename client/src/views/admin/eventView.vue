<template>
    <div class="container">
      <h1 style="padding: 15px; font-size: 27px;">이벤트</h1>
      <button type="button" class="btn btn-outline-secondary m-2"  @click="modalOpenTF" v-if="modalOpen === false">추가</button>
      <button type="button" class="btn btn-outline-secondary m-2"  @click="modalOpenTF" v-if="modalOpen === true">닫기</button>

      <table class="table table-hover" style="font-size: 15px;">
        <thead>
          <tr class="table-primary">
            <th>코드</th>
            <th>배너이름</th>
            <th>이동url</th>
            <th>등록일</th>
            <th>활성화여부</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <!--for 과 if를 같이 사용은 불가능하다고 생각해라-->
          <tr v-for="(event, idx) in eventList" :key="idx">
            <td>{{ event.event_cd }}</td>
            <td>{{ event.event_name }}</td>
            <td>{{ event.path }}</td>
            <td>{{ dateFomat(event.crd_date) }}</td>
            <td>{{ event.status }}</td>
            <td><button class="btn" @click="delEvent(event.event_cd)">삭제</button></td>
          </tr>
        </tbody>
      </table>
  
        <!-- 배너추가창 -->

        <!-- 모달창 -->
        
<div class="black-bg" v-if="modalOpen === true">
  <div class="bg-light rounded h-100 p-4">                
    <h6 class="mb-4">배너추가</h6>
    <form name="bannerForm">
        <div class="row mb-3">
            <label for="banName" class="col-sm-2 col-form-label" >배너 이름</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" name="bannerName" v-model="bannerInfo.name" >
            </div>
        </div>
        <div class="row mb-3">
            <label for="banUrl" class="col-sm-2 col-form-label">이동 url</label>
            <div class="col-sm-10">
                <input type="url" class="form-control" name="bannerPath"  v-model="bannerInfo.path" >
            </div>
        </div>
        <fieldset class="row mb-3">
            <legend for="bannStatus" class="col-form-label col-sm-2 pt-0">활성화 여부</legend>
            <div class="col-sm-10">
              <ul class="nav">
                <li class="nav-item">
                  <div class="form-check">
                    <input for="bannSt" class="form-check-input" type="radio" name="gridRadios1" id="gridRadios1" :value="checkSt0"  v-model="bannerInfo.status" checked>
                    <label class="form-check-label" for="gridRadios1">
                        활성화&nbsp;&nbsp;&nbsp;
                    </label>
                  </div>
                </li>
                <li class="nav-item">
                  <div class="form-check">
                    <input for="bannSt" class="form-check-input" type="radio" name="gridRadios2" id="gridRadios2" :value="checkSt1"  v-model="bannerInfo.status" >
                    <label class="form-check-label" for="gridRadios2">
                        비활성화
                    </label>
                  </div>
                </li>
              </ul>
            </div>
        </fieldset>
        <div class="mb-3">
    <input @change="fileSelect()" for="dataFilesUpl" class="form-control" type="file" name="dataFiles" accept="image/*" multiple ref="images" />
          <input for="tablecd" type="hidden" name="table_cd" :value="4">
          <input for="type_cd" type="hidden" name= "type_cd" :value="2">  

        </div>
        <button type="reset" class="btn btn-primary">취소하기</button>
        <button type="button" class="btn btn-primary" @click="bannerInsert()">저장하기</button>
    </form>
</div>
</div>
</div>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    data () {
      return {
        eventList : [],
        // selected: [],
        modalOpen: false,
        bannerInfo: {
          event_name: '',
          path: '',
          status: "0", 
          table_cd: '',
          type_cd: ''
        },
        checkSt0 : "0",
        checkSt1 : "1",
        bannerImage: '',

        paging : [],
        allSize : 1,  // 모든 데이터 수
        pageSize : 5, // 한 페이지에서 보여줄 데이터 수
        navSize : 5,  // 페이지네이션이 보여줄 최대 페이지 수
        lastPage : 1,  // Math.ceil(allSize / pageSize) 마지막 페이지
        curPage : 1,  // 현재 페이지
        startPage : 1,  // 페이지네이션 시작번호
        endPage : 1,  // 페이지네이션 끝번호
      }
    },
    mounted() {
      this.getTableList();    
    // },
    // computed: {
    //     selectAll: {
    //         get() {
    //             return this.selected.length === this.eventList.length;
    //         },
    //         set(value) {
    //             this.selected = value ? this.eventList : [];
    //         }
    //     },

    },
    methods : {
      
      dateFomat(date){
        let date1 = new Date(date);
        const year = date1.getFullYear();
        const month = ('0' + (date1.getMonth() + 1)).slice(-2);
        const day = ('0' + date1.getDate()).slice(-2);
        const dateStr = `${year}-${month}-${day}`;
        return dateStr;
      },
      fileSelect() {
        console.log(this.$refs.images.files.length);
        if(this.$refs.images.files.length > 1){
          alert('배너이미지는 1개만 첨부 가능합니다.');
          this.$refs.images.value = null;
        }else {
          this.bannerImage = this.$refs.images.files[0];
        }
        console.log(this.bannerImage);
      },
      async delEvent(event_cd) {
        console.log(event_cd);
        if(confirm('정말 삭제하시겠습니까?')){
          let result = await axios.delete(`/api/notice/eventDel/${event_cd}`)
                                  .catch(err => console.log(err));
          console.log(result.data);
          if (result.data.affectedRows > 0) {
            Swal.fire({
                icon: "success",
                title: "삭제 완료",
                showConfirmButton: false,
                timer: 1000
            });
            };
            
          this.$router.go(this.$router.currentRoute);
        }
      },

      async bannerInsert(){
        // this.bannerInfo.type_cd = 1;
        this.bannerInfo.type_cd = this.eventList[0].event_cd + 1;
        this.bannerInfo.table_cd = 3;
        let formData = new FormData(window.Document.bannerForm); //form 안의 값을 다 넣어줌
        formData.append('event_name',this.bannerInfo.name);
        formData.append('path',this.bannerInfo.path);
        formData.append('status',this.bannerInfo.status);
        formData.append('dataFiles',this.bannerImage);
        formData.append('table_cd',this.bannerInfo.table_cd);
        formData.append('type_cd',this.bannerInfo.type_cd);

        console.log(formData);

        let axiosConfig = {  
        Headers: {
            "Content-Type": "multipart/form-data",
          }
        }
        
            let result = await axios.post("/api/upload", formData ,axiosConfig)
                               .catch(err => console.log(err));
                               console.log(' Result출력:', result.data);
            if(result) {
              alert('등록이 완료되었습니다.');
              this.$router.go(this.$router.currentRoute);
            } else {
              alert('등록이 실패하였습니다. 재시도해주세요.');
            }
        },
      async getTableList(curPage) {
        curPage = this.judgePage(curPage);
        if (!curPage || curPage <= 0) 
          curPage = this.startPage;
        let gap = curPage%this.navSize === 0 ?  this.navSize - 1 : curPage%this.navSize - 1;
        this.startPage = this.judgePage(curPage - gap);
        this.endPage = this.startPage + this.navSize - 1;
        await this.getTableCount(curPage);
        if (this.lastPage < this.endPage)
        this.endPage = this.lastPage;

        this.paging = [];
        for (let i = this.startPage; i <= this.endPage; i++) {
          this.paging.push(i)
        }
        this.curPage = curPage;
        let result = await axios.get(`/api/notice/event/${(curPage - 1) * this.pageSize}/${this.pageSize}`)
                                .catch(err => console.log(err));
        this.eventList = result.data;
      },
      // 테이블 행 총 갯수 가져오기  /api/~~ 만 수정해서 사용.
      async getTableCount() {
        let result = await axios.get(`/api/notice/event`) 
                                .catch(err => console.log(err));
        this.allSize = result.data[0].count;
        this.lastPage = Math.ceil(this.allSize / this.pageSize);
      },
      judgePage(page) {
        if (!page || page <= 0) 
          page = 1
        else if (page > this.lastPage) 
          page = this.lastPage
        return page
      },
      modalOpenTF(){
        if(this.modalOpen == false){
          this.modalOpen = true;

        }else{
          this.modalOpen = false;
        }
      }
    //   ,
    //   async deleteSelected() {
    // if (this.selected.length === 0) {
    //   alert('선택된 항목이 없습니다.');
    //   return;
    // }
    //   for (let i of this.selected) {
    //             let result = await axios.delete('/api/notice/eventDel/' + i.event_cd)
    //                 .catch(err => console.log(err));
    //             console.log(result);
    //         }
      
    //   // Clear the selection
    //   this.selected = [];
    // }
  } 
    }
  </script>
  
  <style scoped>
    .selected {
      background-color: #ddd;
      font-weight: bold;
    }
  </style>