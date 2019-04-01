<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <todo-header @addTodo="addTodo"/>
      <todo-list :todos="todos" />
      <todo-footer :todos="todos" :delComplete="delComplete" :selectAll="selectAll"/>
    </div>
  </div>
</template>

<script>
  import PubSub from 'pubsub-js'
  import TodoHeader from './components/TodoHeader'
  import TodoList from './components/TodoList'
  import TodoFooter from './components/TodoFooter'
  import storageUtil from './util/storageUtil'

  export default {
    name: 'App',
    data () {
      return {
        //从localStorage读取todos
        todos : storageUtil.getStorageInfo('todos')
      }
    },
    components: {
      TodoHeader,
      TodoList,
      TodoFooter
    },
    watch:{//监视
      todos :{
        deep : true,//开启深度监视
        /*handler : function(value){
          //将todos最新的值的JSON数据存储到localStorage
         // window.localStorage.setItem("todos",JSON.stringify(value))
          storageUtil.setStorageInfo("todos",value)
        }*/
        handler :storageUtil.setStorageInfo
      }
    },
    mounted () {
      //订阅消息  订阅删除的消息，不受层层传递的影响，可以直接到所需要用到此方法的页面
      PubSub.subscribe('delTodo',(msg,data) => {
        this.delTodo(data)
      })
    },
    methods: {
      addTodo(todo){
        this.todos.unshift(todo)
      },
      delTodo(index){
        this.todos.splice(index,1)
      },
      delComplete(){
        this.todos = this.todos.filter(todo => !todo.complete)
      },
      selectAll(check){
        this.todos.forEach(todo => todo.complete = check)
      }
    }
  }
</script>

<style scoped>
  /*app*/
  .todo-container {
    width: 600px;
    margin: 0 auto;
  }
  .todo-container .todo-wrap {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

</style>
