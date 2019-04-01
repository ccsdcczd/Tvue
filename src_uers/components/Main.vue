<template>
  <div>
    <h2 v-if="firstView">输入用户名搜索</h2>
    <h2 v-if="loading">Loading......</h2>
    <h2 v-if="errorMsg">{{errorMsg}}</h2>
    <div v-else class="row">
      <div class="card" v-for="(user,index) in users" :key="index">
        <a :href="user.url" target="_blank">
          <img :src="user.avatar_url" style='width: 100px'/>
        </a>
        <p class="card-text">{{user.name}}</p>
      </div>

    </div>
  </div>
</template>

<script>
  import PubSub from 'pubsub-js'
  import axios from 'axios'
  export default {
    name: 'Main',
    data () {
      return{
        firstView: true,
        loading: false,
        users: null,
        errorMsg: ''
      }
    },
    mounted () {
      //订阅搜索的消息
      PubSub.subscribe("search",(msg , searchName)=>{

        const url = `https://api.github.com/search/users?q=${searchName}`

        //更新显示状态
        this.firstView = false
        this.loading = true
        this.errorMsg = false
        this.users = null

        //发送ajax请求
        axios.get(url).then(response=>{
          //成功
          this.loading = false
          this.errorMsg = false
          const result = response.data
          this.users = result.items.map(item =>({
            url: item.html_url,
            avatar_url: item.avatar_url,
            name: item.login
          }))
          //
        }).catch(error=>{
          //失败
          this.loading = false
          this.users = null
          this.errorMsg = error
        })




      })
    }
  }
</script>

<style scoped>
  .card {
    float: left;
    width: 33.333%;
    padding: .75rem;
    margin-bottom: 2rem;
    border: 1px solid #efefef;
    text-align: center;
  }

  .card > img {
    margin-bottom: .75rem;
    border-radius: 100px;
  }

  .card-text {
    font-size: 85%;
  }
</style>
