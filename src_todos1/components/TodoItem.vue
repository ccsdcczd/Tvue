<template>
  <li @mouseenter="handleShow(true)" @mouseleave="handleShow(false)" :style="{background:bgColor}">
    <label>
      <input type="checkbox" v-model="todo.complete"/>
      <span>{{todo.title}}</span>
    </label>
    <button class="btn btn-danger" v-show="isShow" @click="delItem">删除</button>
  </li>
</template>

<script>
  export default {
    props :{
      todo: Object,
      index: Number,
      delTodo : Function
    },
    name: 'TodoItem',
    data (){
      return {
        bgColor : 'white',
        isShow : false
      }
    },
    methods: {
      handleShow (isEnter) {
        if (isEnter){
          this.bgColor = '#aaaaaa'
          this.isShow = true
        } else {
          this.bgColor = 'white'
          this.isShow = false
        }
      },
      delItem(){
        if(window.confirm(`确认删除${this.todo.title}的记录吗？`)){
          this.delTodo(this.index)
        }
      }
    }
  }
</script>

<style scoped>
  /*item*/
  li {
    list-style: none;
    height: 36px;
    line-height: 36px;
    padding: 0 5px;
    border-bottom: 1px solid #ddd;
  }

  li label {
    float: left;
    cursor: pointer;
  }

  li label li input {
    vertical-align: middle;
    margin-right: 6px;
    position: relative;
    top: -1px;
  }

  li button {
    float: right;
    margin-top: 3px;
  }

  li:before {
    content: initial;
  }

  li:last-child {
    border-bottom: none;
  }
</style>
