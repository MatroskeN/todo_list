import { createStore } from 'vuex'

export default createStore({
  state: {
    user_list: [
      {
        id: 1,
        user_name: 'Джек Керуак',
        todo_list: [
          {
            task_id: 1,
            task: 'Помыть попу1',
            is_completed: false,
          }
        ]
      },
      {
        id: 2,
        user_name: 'Аллен Гинзберг',
        todo_list: [
          {
            task_id: 1,
            task: 'Помыть попу2',
            is_completed: false,
          }
        ]

      },
      {
        id: 3,
        user_name: 'Уильям Берроуз',
        todo_list: [
          {
            task_id: 1,
            task: 'Помыть попу3',
            is_completed: false,
          }
        ]
      },
      {
        id: 4,
        user_name: 'Люсьен Карр',
        todo_list: [
          {
            task_id: 1,
            task: 'Помыть попу4',
            is_completed: false,
          }
        ]
      },
      {
        id: 5,
        user_name: 'Дэвид Каммерер',
        todo_list: [
          {
            task_id: 1,
            task: 'Помыть попу5',
            is_completed: false,
          }
        ]
      },
    ]
  },
  getters: {
    GET_USER_LIST(state) {
      return state.user_list;
    },
    GET_USER_TASKS(state, user_id) {
      return state.user_list[user_id].todo_list;
    }
  },
  mutations: {
    SET_USER_TASK: (state, todo_list, user_id) => {
      state.user_list[user_id].todo_list = todo_list
    }
  },
  actions: {
  },
  modules: {
  }
})
