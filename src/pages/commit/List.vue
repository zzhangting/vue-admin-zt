<template>
<!-- 顾客管理-->
<div>
    <!--按钮-->
    <el-button type="success" size="small" @click="toAddHandler">添加</el-button>
        <el-button type="danger" size="small">批量删除</el-button>
        <!---/按钮--->
        <!--表格--->
        <el-table :data="comments">
             <el-table-column prop="name" label="用户名"></el-table-column>
            <el-table-column prop="content" label="内容"></el-table-column>
            <el-table-column prop="commentTime" label="评论时间"></el-table-column>
            <el-table-column prop="orderId" label="订单id"></el-table-column>
            <el-table-column label="操作">
                <template v-slot="slot">
                    <a href="" @click.prevent="toDeleteHandler(slot.row.id)">删除</a>
                    <a href="" @click.prevent="toUpdateHandler(slot.row)">修改</a>
                </template>
            </el-table-column>
        </el-table>
        <!---表格结束--->
        <!----分页开始--->
         <el-pagination layout="prev, pager, next" :total="50"></el-pagination>
         <!---分页结束--->
         <!---模块框--->
         <el-dialog
  title="录入评论内容"
  :visible.sync="visible"
  width="60%">
  ---{{form}}
  <el-form :model="form" label-width="80px">
      <el-form-item label="用户名">
         <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="内容">
         <el-input v-model="form.content"></el-input>
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
//@在路径中表示src目录
import request from '@/utils/request'
import querystring from 'querystring'
export default {
    //methods用于存放网页中需要调用的方法
    methods:{
        loadData(){
            let url = "http://localhost:6677/comment/findAll"
      request.get(url).then((response)=>{
        // 将查询结果设置到customers中，this指向外部函数的this
        this.comments = response.data;
      })
    },
        //通过request与后台进行交互，并且携带参数
        submitHandler(){
            //交互端口
            let url="http://localhost:6677/comment/saveOrUpdate"
            request({
                url,
                method:"POST",
                headers:{
                    "Content-Type":"application/x-www-form-urlencoded"
                },
                //交互时传递的参数为this.form
                data:querystring.stringify(this.form)
            }).then((response)=>{
                //请求结束，模态框关闭
                this.closeModalHandler();
                //刷新
                this.loadData();
                //提示消息
                this.$message({
                    type:"success",
                    message:response.message
                })
            })
        },
        toDeleteHandler(id){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            //调用后台接口,完成删除操作
            let url ="http://localhost:6677/comment/deleteById?id="+id
            request.get(url).then((response)=>{
                //刷新数据
                this.loadData();
                //提示结果
                this.$message({
                type: 'success',
                message: response.message
          });
            })
          this.$message({
                type: 'success',
                //加id的目的是看有没有拿到
                message: '删除成功!'+id
          });
        }) 
        },
        toUpdateHandler(row){
            //
            this.form=row;
            this.visible=true;
        },
        closeModalHandler(){
            this.visible=false;
        },
      toAddHandler(){
            //将form变为初始值
             this.form={
                 type:"comment"
             }
           this.visible=true;
        }
    },
    //用于存放要向网页中显示的数据
    data(){
        return{
            visible:false,
            comments:[],
            form:{
                type:"comment"
            }
            
        }
    },
    //created表示vue实例创建完毕，准备执行
    created(){
        //this为当前vue实例对象
        //vue实例创建完毕
        this.loadData()
    }
}
</script>
<style scoped>
</style>