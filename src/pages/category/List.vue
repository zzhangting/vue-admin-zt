<template>
<div>
    <!--按钮--->
        <el-button size="small" type="primary" @click="toAddHandler">添加</el-button>
        <el-button size="small" type="danger">批量删除</el-button>
    <!--/按钮-->
    <el-table :data="categories">
        <el-table-column width=30><el-checkbox></el-checkbox></el-table-column>
        <el-table-column label="编号" prop="id"></el-table-column>
        <el-table-column label="栏目名称" prop="name"></el-table-column>
        <el-table-column label="序号" prop="num"></el-table-column>
        <el-table-column label="父栏目" prop="parentId"></el-table-column>
        <el-table-column  label="操作" >
            <template v-slot="slot">
                    <a href="" @click.prevent="toDeleteHandler(slot.row.id)">删除</a>
                    <a href="" @click.prevent="toUpdateHandler(slot.row)">修改</a>
            </template>
        </el-table-column>
    </el-table>
    <!-- /表格 -->
     <!--分页-->
    <el-pagination layout="prev, pager, next" :total="50"></el-pagination>
    <!--/分页-->
    <!--模态框-->
    <el-dialog
  :title="title"
  :visible.sync="visible"
  width="60%">
  ---{{form}}
 <el-form :model="form" label-width="80px">
     <el-form-item label="栏目名称">
         <el-input v-model="form.name"></el-input>
     </el-form-item>
     <el-form-item label="序号">
         <el-input  v-model="form.num"></el-input>
     </el-form-item>
 </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button size="small" @click="closeModalHandler">取 消</el-button> 
    <el-button size="small" type="primary" @click="submitHandler">确 定</el-button>
  </span>
</el-dialog>
    <!--/模态框-->
    </div>
</template>
<script>
import request from '@/utils/request'//第三方库，加路径
import querystring from 'querystring'//系统库
export default {
    data(){
        return{
            title:"添加栏目信息",
            visible:false,
            categories:[],
            form:{
                type:"category"      
            }
            
        }
    },
    created(){
        //在页面加载出来的时候加载数据
        this.loadData()
    },
    methods:{
        submitHandler(){
            let url="http://localhost:6677/category/saveOrUpdate";
            //前端向后台发送请求，完成数据的保存操作
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
            let url="http://localhost:6677/category/findAll"
            //箭头函数中的this，指向外部函数的this
            request.get(url).then((response)=>{
                this.categories = response.data;
            })
        },
        toAddHandler(){
            this.visible=true;
            this.title="添加栏目信息";
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
            this.title="修改栏目信息";
        },
        closeModalHandler(){
            this.visible=false;
        }
    }
}
</script>
<style scoped>

</style>