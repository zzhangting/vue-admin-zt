<template>
<div>
    <!--按钮--->
    <div>
        <el-button size="small" type="primary" @click="toAddHandler">添加</el-button>
        <el-button size="small" type="danger">批量删除</el-button>
    </div>
    <!--/按钮-->
    <el-table :data="employees">
        <el-table-column label="编号" prop="id"></el-table-column>
        <el-table-column fixed="left" label="姓名" prop="realname"></el-table-column>
        <el-table-column label="用户名" prop="username"></el-table-column>
        <el-table-column label="性别" prop="gender"></el-table-column>
        <el-table-column  label="手机号" prop="telephone" ></el-table-column>
        <el-table-column width="200" label="身份证号" prop="idCard"></el-table-column>
        <el-table-column width="200" label="银行卡号" prop="bankCard"></el-table-column>
        <el-table-column fixed="right" label="操作" >
            <template v-slot="slot">
                  <!-- {{slot.row}}用来显示操作后面那堆员工信息 -->
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
     <el-form-item label="用户名">
         <el-input v-model="form.username"></el-input>
     </el-form-item>
     <el-form-item label="姓名">
         <el-input  v-model="form.realname"></el-input>
     </el-form-item>
     <el-form-item label="性别">
    <el-radio-group v-model="form.gender">
    <el-radio label="男">男</el-radio>
    <el-radio label="女">女</el-radio>
    </el-radio-group>
     </el-form-item>
     <el-form-item label="密码">
         <el-input type="password" v-model="form.password"></el-input>
     </el-form-item>
     <el-form-item label="身份证号">
         <el-input v-model="form.idCard"></el-input>
     </el-form-item>
     <el-form-item label="银行卡号">
         <el-input v-model="form.bankCard"></el-input>
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
            title:"录入员工信息",
            visible:false,
            employees:[],
            form:{
                type:"waiter"      
            }
            // employees:[{
            //     id:1,
            //     realname:"杨大茹",
            //     gender:"女",
            //     age:"30",
            //     telphone:"18435645281",
            //     idCard:"130729199810300051",
            //     bankCard:"68169455791128941222"
            // },{
            //     id:2,
            //     realname:"张大婷",
            //     gender:"女",
            //     age:"18",
            //     telphone:"18435663281",
            //     idCard:"13072919981030007856",
            //     bankCard:"68169455791128941452"
            // },{
            //     id:3,
            //     realname:"张哥",
            //     gender:"男",
            //     age:"31",
            //     telphone:"18435645741",
            //     idCard:"130729199810300045",
            //     bankCard:"68169455791128941236"
            // }]
        }
    },
    created(){
        //在页面加载出来的时候加载数据
        this.loadData();
    },
    methods:{
        submitHandler(){
            let url="http://localhost:6677/waiter/saveOrUpdate";
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
            let url="http://localhost:6677/waiter/findAll"
            //箭头函数中的this，指向外部函数的this
            request.get(url).then((response)=>{
                this.employees = response.data;
            })
        },
        toAddHandler(){
            this.visible=true;
            this.title="修改员工信息";
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
            this.title="修改员工信息";
        },
        closeModalHandler(){
            this.visible=false;
        }
    }
}
</script>
<style scoped>

</style>