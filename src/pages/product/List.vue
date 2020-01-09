<template>
<div>
    <!--按钮-->
    <el-button type="success" size="small" @click="toAddHandler">添加</el-button>
        <el-button type="danger" size="small">批量删除</el-button>
        <!---/按钮--->
        <!--表格--->
        <el-table :data="products">
            <el-table-column prop="id" label="编号"></el-table-column>
            <el-table-column width="200px" prop="name" label="产品名称"></el-table-column>
            <el-table-column prop="price" label="价格"></el-table-column>
            <el-table-column width="200px" prop="description" label="描述"></el-table-column>
            <el-table-column prop="categoryId" label="所属产品"></el-table-column>
            <el-table-column width="650px" prop="photo" label="照片"></el-table-column>
            <el-table-column label="操作">
                <template v-slot="slot">
                    <a href="" @click.prevent="toDeleteHandler(slot.row.id)">删除</a>
                    <a href="" @click.prevent="toUpdateHandler(slot.row)">修改</a>
                    <a href="" @click.prevent="">详情</a>
                </template>
            </el-table-column>
        </el-table>
        <!---表格结束--->
        <!----分页开始--->
         <el-pagination layout="prev, pager, next" :total="50"></el-pagination>
         <!---分页结束--->
         <!---模块框--->
         <el-dialog
  title="录入产品信息"
  :visible.sync="visible"
  width="60%">
 ---{{form}}
 <el-form :model="form" label-width="80px">
    <el-form-item label="产品名称">
        <el-input v-model="form.name"></el-input>
    </el-form-item>
     <el-form-item label="价格">
        <el-input v-model="form.price"></el-input>
    </el-form-item>
    <el-form-item label="所属栏目">
         <el-select v-model="form.categoryId">
             <el-option v-for="item in options"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id" 
                        ></el-option>
         </el-select>
         
    </el-form-item>
    <el-form-item label="描述">
         <el-input  type="textarea"  v-model="form.description"></el-input>
    </el-form-item>
    <el-form-item label="图片">
         <el-upload
            class="upload-demo"
            action="http://134.175.154.93:6677/file/upload"
            :file-list="fileList"
            :on-success="uploadSuccessHandler"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
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
        //加载栏目信息
        uploadSuccessHandler(response){
            //上传事件处理函数
            let photo="http://134.175.154.93:8888/group1/"+response.data.id
            +response.data.id
            //将图片地址设置到form中，便于提价给后台
            this.form.photo=photo;
        },
         handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
        loadCategory(){
            let url = "http://localhost:6677/category/findAll"
            request.get(url).then((response)=>{
        // 将查询结果设置到customers中，this指向外部函数的this
        this.options = response.data;
      })
    },
        loadData(){
            let url = "http://localhost:6677/product/findAll"
            request.get(url).then((response)=>{
            // 将查询结果设置到customers中，this指向外部函数的this
           this.products = response.data;
      })
    },
        //通过request与后台进行交互，并且携带参数
        submitHandler(){
            //交互端口
            let url="http://localhost:6677/product/saveOrUpdate"
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
            let url ="http://localhost:6677/product/deleteById?id="+id
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
            this.fileList=[]
            this.form=row;
            this.visible=true;
        },
        closeModalHandler(){
            this.visible=false;
        },
      toAddHandler(){
            //将form变为初始值
             this.form={
                 type:"product"
             }
           this.visible=true;
           this.fileList=[];
        }
    },
    //用于存放要向网页中显示的数据
    data(){
        return{
            visible:false,
            products:[],
            options:[],
            fileList:[],
            form:{
                type:"product"
            } 
        }
    },
    //created表示vue实例创建完毕，准备执行
    created(){
        //this为当前vue实例对象
        //vue实例创建完毕
        this.loadData();
        this.loadCategory();
    }
}
</script>
<style scoped>
</style>