<template>
  <div v-if="!repoUrl">loading</div>
  <div v-else>most star repo is <a :href="repoUrl">{{repoName}}</a></div>
</template>

<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        repoUrl: '',
        repoName: ''
      }
    },
    mounted () {
      //发送ajax请求获取数据
      const url = `https://api.github.com/search/repositories?q=vu&sort=stars`
      //使用vue-resource发送ajax请求
      /*this.$http.get(url).then(
        response => {
          //成功
          const result = response.data
          //取出第一个数据
          const mostRepo = result.items[0]
          this.repoUrl = mostRepo.html_url
          this.repoName = mostRepo.name
        },
        reponse => {
          alert('请求失败！')
        }
      )*/
      //使用axios发送ajax请求
      axios.get(url).then(
        response => {
          //成功
          const result = response.data
          //取出第一个数据
          const mostRepo = result.items[0]
          this.repoUrl = mostRepo.html_url
          this.repoName = mostRepo.name
        }
      ).catch(error => {
        alert(error)
      })
    }
  }
</script>

<style scoped>

</style>
