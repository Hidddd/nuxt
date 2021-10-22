<template>
  <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
    <Form-item prop="user">
      <Input type="text" v-model="formInline.user" placeholder="用户名">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
      </Input>
    </Form-item>
    <Form-item prop="password">
      <Input
        type="password"
        v-model="formInline.password"
        placeholder="密码"
      >
        <Icon type="ios-locked-outline" slot="prepend"></Icon>
      </Input>
    </Form-item>
    <Form-item prop="password">
      <Input
        type="password"
        v-model="formInline.code"
        placeholder="验证码"
      >
        <Icon type="ios-locked-outline" slot="prepend"></Icon>
      </Input>
      <Button type="primary" @click="getcodenum()">获取验证码</Button>
    </Form-item>
    <Form-item>
      <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
    </Form-item>
    <Form-item>
      <img :src="codeImg" alt="">
    </Form-item>
  </Form>
</template>
<script>
import { getCode,Login ,GetCaptcha } from '@/request/api'
export default {
  data() {
    return {
      formInline: {
        user: "",
        password: "",
        code: ""
      },
      codeImg: '',
      codeTkoen: '', // 验证码
      ruleInline: {
        user: [{ required: true, message: "请填写用户名", trigger: "blur" }],
        password: [
          { required: true, message: "请填写密码", trigger: "blur" },
          {
            type: "string",
            min: 6,
            message: "密码长度不能小于6位",
            trigger: "blur",
          },
        ],
        code: [{ required: true, message: "请填写验证码", trigger: "blur" }]
      },
    };
  },
  mounted(){
    this.demo()
  },
  methods: {
    getcodenum() {
      let params = {
        width: 112,
        height: 42
      }
      GetCaptcha(params).then(res => {
        if(res.code === 0) {
          this.codeImg = res.data.base64_pic
          // console.log(this.codeImg);
          this.codeTkoen = res.data.token
        }
      })
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          let params = {
            phone: this.formInline.user,
            password: this.formInline.password,
            pic_code: this.codeImg,
            pic_code_token: this.codeTkoen
          }
          Login(params).then(res =>{
            console.log(res)
          })
        } else {
          this.$Message.error("表单验证失败!");
        }
      });
    },
    zeroMove(array) {
      let len = array.length;
      let j = 0;
      for(let i=0;i<len-j;i++){
        if(array[i]===0){
          array.push(0);
          array.splice(i,1);
          i --;
          j ++;
        }
      }
      console.log(array);
      return array;
    },
    demo() {
      let arr = [1,0,12,15,0,5,6]
      this.zeroMove(arr)
    },
    /// 防抖
    debounce(fn, wait, immediate) {
      let timer = null
      return function() {
          let args = arguments
          let context = this

          if (immediate && !timer) {
              fn.apply(context, args)
          }

          if (timer) clearTimeout(timer)
          timer = setTimeout(() => {
              fn.apply(context, args)
          }, wait)
      }
    }
  },
};
</script>
<style lang="less" scoped>
</style>