<template>
    <div>
        <!--按钮-->
        <el-button type="success" size="small" @click="toAddHandler">
            添加
        </el-button>
        <el-button type="danger" size="small" >批量删除</el-button>
        <!--/按钮-->
        <!--表格-->
        <el-table :data="customers">
            <el-table-column prop="id" label="编号"></el-table-column>
            <el-table-column prop="realname" label="姓名"></el-table-column>
            <el-table-column prop="telephone" label="联系方式"></el-table-column>
            <el-table-column  label="操作">                                     
              <template v-slot="slot"> 
                 <a href="" @click.prevent="toDeleteHandler(slot.row.id)">删除</a>
                 <a href="" @click.prevent="toUpdateHandler(slot.row)">修改</a>
              </template>
            </el-table-column>
        </el-table>
        <!--/表格-->
        <!--分页-->
        <!-- <el-pagination layout="prev, pager, next" :total="50"></el-pagination> -->
        <!--/分页-->
        <!--模态框-->
        <el-dialog 
        title="录入顾客信息"
        :visible.sync="visible" 
        width ="60%">
        测试:{{form}}
            <el-form :model="form" label-width="80px">
                <el-form-item label="用户名">
                    <el-input v-model="form.username"></el-input> 
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.password" type="password"></el-input>
                </el-form-item>
                <el-form-item label="真实姓名">
                    <el-input v-model="form.realname" ></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="form.telephone" ></el-input>
                </el-form-item>
            </el-form>


            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="closeModalHandler">
                    取消
                </el-button>
                <el-button size="small" type="primary" @click="sumbitHandler">确定</el-button>    
            </span>

        </el-dialog>
        <!--/模态框-->
    </div>
</template>

<script>
import request from '@/utils/request' //在路径模板中@表示src目录
import querystring from 'querystring'
export default {
    //用于存放网页中需要调用的方法
   methods:{
        toDeleteHandler(id){
            this.$confirm('此操作将永久删除该文件，是否继续？','提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url="http://localhost:6677/customer/deleteById?id="+id;
                request.get(url).then((response)=>{
                    //刷新数据
                    this.loadData();
                    //提示结果
                    this.$message({
                    type: 'success',
                    message:response.message 
                });

                })               
            })
        },
        toUpdateHandler(row){
            //模态框中显示当前行的信息
            this.form=row;
            this.visible = true;
        },
        closeModalHandler(){
            this.visible = false;
        },
        toAddHandler(){
            this.form={
                type:"customer"
            }
            this.visible = true;
        },
        sumbitHandler(){
            //通过request与后台进行交互，并且要携带参数
            let url="http://localhost:6677/customer/saveOrUpdate"
            request({
                url,
                method:"POST",
                headers:{
                    "Content-Type":"application/x-www-form-urlencoded"
                },  
                data:querystring.stringify(this.form)              
            }).then((response)=>{
                //请求结束 模态框关闭
                this.closeModalHandler();
                //提示消息
                this.$message({
                    type:"success",
                    message:response.message
                })
            })

        },
        loadData(){
            let url = "http://localhost:6677/customer/findAll"
      request.get(url).then((response)=>{
          //将查询结果设置到customers中
          this.customers=response.data;
      })


        }
    },
    //用于存放要向网页中显示的数据
    data(){
    return {
         visible:false,
         customers:[],
         form:{
             type:"customer"
         }
           
    }
  },
  created(){
      //this为
      //胜利ue实例创建完毕
      this.loadData();
  }
}
</script>

<style scoped>

</style>
