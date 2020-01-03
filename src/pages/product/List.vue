<template>
    <div>
    <!--按钮-->
    <el-button type="primary" size="small" @click="toAddHandler">添加</el-button>
        <el-button type="danger" size="small">批量删除</el-button>
        <!---/按钮--->
        <!--表格--->
        <el-table :data="products">
            <el-table-column width=30><el-checkbox></el-checkbox></el-table-column>
            <el-table-column label="编号" prop="id"></el-table-column>
            <el-table-column label="产品名称" prop="name"></el-table-column>
            <el-table-column label="价格" prop="price"></el-table-column>
            <el-table-column label="描述" prop="description"></el-table-column>
            <el-table-column label="所属产品" prop="status"></el-table-column>
            <el-table-column label="操作">
              <template v-slot="slot">
                <a href="" @click.prevent="toDeleteHandler(slot.row.id)">删除</a>
                <a href="" @click.prevent="toUpdateHandler(slot.row)">修改</a>
                <a href="" @click.prevent="toDetailHandler(slot.row.id)">详情</a>       
              </template>
            </el-table-column>
        </el-table>
            <el-pagination layout="prev,pager,next" :total="50"></el-pagination>
                    <el-dialog
             :title="title"
             :visible.sync="visible"
              width="60%">
               ---{{form}}
                <el-form :model="form" label-width="80px">
                  <el-form-item label="名称">
                      <el-input v-model="form.user"></el-input>
                  </el-form-item>
                  <el-form-item label="价格">
                      <el-input v-model="form.price"></el-input>
                  </el-form-item>
                  <el-form-item label="所属栏目">
                          <el-dropdown v-model="form.status">
                                    <span class="el-dropdown-link">下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
                                </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>语言</el-dropdown-item>
                                <el-dropdown-item>家居养护</el-dropdown-item>
                                <el-dropdown-item>9357</el-dropdown-item>
                                <el-dropdown-item disabled>洗护服务</el-dropdown-item>
                                <el-dropdown-item divided>生活急救箱</el-dropdown-item>
                                <el-dropdown-item>yyy</el-dropdown-item>
                                <el-dropdown-item>水果慢羊羊</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                  </el-form-item>
                  <el-form-item label="介绍">
                      <el-input v-model="form.description"></el-input>
                  </el-form-item>
                  <el-form-item label="产品主图">
                      <el-input v-model=form.photo></el-input>
                  </el-form-item>
                </el-form>

 <span slot="footer" class="dialog-footer">
    <el-button size="small" @click="closeModalHandler">取 消</el-button> 
    <el-button size="small" type="primary" @click="submitHandler">确 定</el-button>
  </span>
            </el-dialog>
            </div>
</template>
<script>
import request from '@/utils/request'
import querystring from 'querystring'
export default{
    data(){
        return{
            title:"添加产品信息",
            visible:false,
            products:[],
            form:{
                type:"product"
            }
        }
    },
    created(){
        this.loadData();
    },
    methods:{
        toDetailHandler(){
        },
        submitHandler(){
            let url="http://localhost:6677/product/saveOrUpdate";
            request({
                   url,
                method:"post",
               headers:{
                    "Content-Type":"application/x-www-form-urlencoded"
                },
                //请求体中的数据，将this、form转换为查询字符串发送给后台
                data:querystring.stringify(this.form) 
                }).then((response)=>{
                this.closeModalHandler();
                this.loadData();
                this.$message({
                    type:"success",
                    message:response.message
                })
            })
        },
        loadData(){
            //this指向vue实例，通过vue实例访问该实例中的数据，methods中其他数据
            let url="http://localhost:6677/product/findAll"
            //箭头函数中的this，指向外部函数的this
            request.get(url).then((response)=>{
                this.products = response.data;
            })
        },
        toAddHandler(){
            this.visible=true;
            this.title="修改产品信息";
        },
        toDeleteHandler(id){
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            //加id的目的是看有没有拿到
            message: '删除成功!'+id
          });
        }) 
        },
        toUpdateHandler(row){
            this.visible=true;
            this.title="修改产品信息";
        },
        closeModalHandler(){
            this.visible=false;
        }
    }
}
</script>
<style scoped></style>