<template>
  <div class="container">
    <div>
      <h1 class="title">
        nuxts
      </h1>
      <h2 class="subtitle">
        Welcome to the View UI + Nuxt.js template
      </h2>
      <div class="links">
        <nuxt-link :to="'/demo/demo'">de</nuxt-link>
      </div>
      <Tables/>
      <div v-for="info in listInfo" :key="info.id">
        <div v-if="info.name !== null">{{info.name}} </div>
      </div>
      <Forms></Forms>
    </div>
  </div>
</template>
<script>
import Tables from '@/components/table/index'
import Forms from '@/components/from/from'
import { getGameType } from '@/request/api'
export default {
  components: {
    Tables,
    Forms
  },
  data(){
    return {
      listInfo:[]
    }
  },
  async asyncData() {
    let params = {
        page: 1,
        game_type: 1,
        per_page_size: 20
      }
    const obj = await getGameType(params).then(res =>{
      if(res.code === 0) {
        const listInfo = res.data.list
        return listInfo
      }
    })
    // log
    // console.log('菜单',obj);
    return { listInfo: obj }
  },
  mounted(){
    this.getInfo()
  },
  methods: {
    getInfo () {
      let params = {
        page: 1,
        game_type: 1,
        per_page_size: 20
      }
      this.$Loading.start()
      getGameType(params).then(res => {
        if(res.code === 0) {
          this.$Loading.finish();

        } else {
          this.$Loading.error();
          this.$Message.error('请求失败！请重试')
        }
      }) 
    }
  }
}
</script>
<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
