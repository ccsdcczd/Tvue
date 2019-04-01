<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <todo-header :addTodo="addTodo"/>
      <todo-list :todos="todos" :delTodo="delTodo"/>
      <todo-footer :todos="todos" :delComplete="delComplete" :selectAll="selectAll"/>
    </div>
  </div>
</template>

<script>
  import TodoHeader from './components/TodoHeader'
  import TodoList from './components/TodoList'
  import TodoFooter from './components/TodoFooter'

  export default {
    name: 'App',
    data () {
      return {
        //从localStorage读取todos
        todos : JSON.parse(window.localStorage.getItem("todos") || '[]')
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
        handler : function(value){
          //将todos最新的值的JSON数据存储到localStorage
          window.localStorage.setItem("todos",JSON.stringify(value))
        }
      }
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
