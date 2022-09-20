<template>
  <div class="content">
    <h1>{{ title }}</h1>
    <p>
      И их список задач
    </p>
    <ul>
      <li v-for="item in user_list" v-bind:key="item.id">
        <p>{{ item.user_name }}</p>
        <p>{{item.email}}</p>
        <p>{{item.phone}}</p>
        <button class="edit" @click="openPersonalData(item.id)">
          Редактировать данные
        </button>
        <span class="openTaskList" @click="openTodoList(item.id)">Список задач</span>
      </li>
    </ul>
  </div>
  <TodoList ref="todoListComponent" :user_id="user_id" :user_list="user_list"/>
  <PersonalData ref="personalDataComponent" @getPersonalData="getPersonalData" :user_id="user_id" />
</template>

<script>

import TodoList from "@/components/TodoList";
import PersonalData from "@/components/PersonalData";

export default {
  name: 'UserList',
  components: {PersonalData, TodoList},
  props: {
    title: String
  },
  data() {
    return {
      user_id: null,
      user_list: [
        {
          id: 1,
          user_name: 'Джек Керуак',
          email: 'example@gmail.com',
          phone: '+38001233221',
          todo_list: [
            {
              task_id: 1,
              task: 'Почитать книжку',
              is_completed: false,
            }
          ],
          payment: [
            {
              id: 1,
              amount: '$300',
              date: '01-01-1942'
            },
            {
              id: 2,
              amount: '$250',
              date: '02-01-1943'
            }
          ]
        },
        {
          id: 2,
          user_name: 'Аллен Гинзберг',
          email: 'example@gmail.com',
          phone: '+38001233221',
          todo_list: [
            {
              task_id: 1,
              task: 'Посмотреть фильм',
              is_completed: false,
            }
          ],
          payment: [
            {
              id: 1,
              amount: '$300',
              date: '01-01-1942'
            }
          ]

        },
        {
          id: 3,
          user_name: 'Уильям Берроуз',
          email: 'example@gmail.com',
          phone: '+38001233221',
          todo_list: [
            {
              task_id: 1,
              task: 'Помыть посуду',
              is_completed: false,
            }
          ],
          payment: [
            {
              id: 1,
              amount: '$300',
              date: '01-01-1942'
            }
          ]
        },
        {
          id: 4,
          user_name: 'Люсьен Карр',
          email: 'example@gmail.com',
          phone: '+38001233221',
          todo_list: [
            {
              task_id: 1,
              task: 'Постирать шмотки',
              is_completed: false,
            }
          ],
          payment: [
            {
              id: 1,
              amount: '$300',
              date: '01-01-1942'
            }
          ]
        },
        {
          id: 5,
          user_name: 'Дэвид Каммерер',
          email: 'example@gmail.com',
          phone: '+38001233221',
          todo_list: [
            {
              task_id: 1,
              task: 'Сходить погулять',
              is_completed: false,
            }
          ],
          payment: [
            {
              id: 1,
              amount: '$300',
              date: '01-01-1942'
            }
          ]
        },
      ]
    }
  },
  methods: {
    openTodoList: function (this_user_id) {
      this.user_id = this_user_id;
      this.$refs.todoListComponent.openModal();
    },
    openPersonalData: function (this_user_id) {
      this.user_id = this_user_id;
      this.$refs.personalDataComponent.openModal();
    },
    getPersonalData: function (){
      this.user_list = JSON.parse(localStorage.getItem('user_list'))
    }
  },
  created() {
    if (!localStorage.user_list){
      localStorage.setItem('user_list', JSON.stringify(this.user_list))
    }
  },
  mounted(){
    if (localStorage.user_list){
      this.user_list = JSON.parse(localStorage.getItem('user_list'))
    }
  },
  watch: {
    user_list: {
      handler(newValue){
        localStorage.setItem('user_list', JSON.stringify(newValue))
      },
      deep: true
    }
  }
}
</script>

<style scoped lang="scss">
h1 {
  text-align: left;
  margin-bottom: 10px;
  padding-left: 15px;
}

p {
  text-align: left;
  padding-left: 15px;
}

ul {
  display: flex;
  flex-direction: column;
  text-align: left;
  list-style-type: none;
  margin-top: 50px;
  background: aliceblue;
  padding: 10px 15px;
  border-radius: 10px;
}

li {
  display: flex;
  border-bottom: 1px solid #c4c4c4;
  padding: 10px 0;
  &:last-of-type{
    border: none;
  }
  p{
    margin: 0 10px 0 0;
    min-width: 150px;
  }
  button{
    cursor: pointer;
  }
  .openTaskList {
    margin-left: auto;
    color: #42b983;
    cursor: pointer;
  }
}
</style>
