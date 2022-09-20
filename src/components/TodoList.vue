<template>
  <div class="mask" v-if="modal_is_opened">
    <div class="modal">
      <svg class="xClose" @click="modal_is_opened = false"
           width="24"
           height="24"
           viewBox="0 0 24 24"
           fill="none"
           xmlns="http://www.w3.org/2000/svg"
      >
        <path
            d="M16.3394 9.32245C16.7434 8.94589 16.7657 8.31312 16.3891 7.90911C16.0126 7.50509 15.3798 7.48283 14.9758 7.85938L12.0497 10.5866L9.32245 7.66048C8.94589 7.25647 8.31312 7.23421 7.90911 7.61076C7.50509 7.98731 7.48283 8.62008 7.85938 9.0241L10.5866 11.9502L7.66048 14.6775C7.25647 15.054 7.23421 15.6868 7.61076 16.0908C7.98731 16.4948 8.62008 16.5171 9.0241 16.1405L11.9502 13.4133L14.6775 16.3394C15.054 16.7434 15.6868 16.7657 16.0908 16.3891C16.4948 16.0126 16.5171 15.3798 16.1405 14.9758L13.4133 12.0497L16.3394 9.32245Z"
            fill="currentColor"
        />
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"
            fill="currentColor"
        />
      </svg>
      <div class="list">
        <div class="listTitle">
          Список задач пользователя
        </div>
        <div class="listItem" v-for="(item, index) in todo_list[user_id-1].todo_list" v-bind:key="item.id">
          <div class="taskName" :class="[item.is_completed ? 'activeTask' : 'passiveTask']"
               :contenteditable="!item.is_completed" :spellcheck="false" @blur="(e) => saveValue(e, index)">{{ item.task }}
          </div>
          <div class="controls">
            <button class="removeTask" @click="removeTask(index)">
              <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
              >
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M17 5V4C17 2.89543 16.1046 2 15 2H9C7.89543 2 7 2.89543 7 4V5H4C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H5V18C5 19.6569 6.34315 21 8 21H16C17.6569 21 19 19.6569 19 18V7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H17ZM15 4H9V5H15V4ZM17 7H7V18C7 18.5523 7.44772 19 8 19H16C16.5523 19 17 18.5523 17 18V7Z"
                    fill="currentColor"
                />
                <path d="M9 9H11V17H9V9Z" fill="currentColor"/>
                <path d="M13 9H15V17H13V9Z" fill="currentColor"/>
              </svg>
            </button>
            <input type="checkbox" v-bind:id="'taskCheck'+index" v-model="item.is_completed">
          </div>
        </div>
        <div class="listItem">
          <input type="text" placeholder="Задача" v-model="input_task">
          <button class="addTask" @click="addTask">
            Добавить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TodoList',
  props: {
    user_id: Number,
    user_list: Array
  },
  data() {
    return {
      modal_is_opened: false,
      todo_list: [],
      input_task: ''
    }
  },
  methods: {
    openModal: function () {
      this.modal_is_opened = true;
      this.todo_list = this.user_list;
    },
    addTask: function () {
      this.todo_list[this.user_id - 1].todo_list.push({
        task_id: "id" + Math.random().toString(16).slice(2),
        task: this.input_task,
        is_completed: false
      });
      this.input_task = '';
    },
    removeTask: function (index) {
      this.todo_list[this.user_id - 1].todo_list.splice(index, 1);
    },
    saveValue: function (evt, index) {
      this.todo_list[this.user_id - 1].todo_list[index].task = evt.target.innerText;
    }
  },
}
</script>

<style scoped lang="scss">
input, button, a {
  outline: none;
  border: none;
  background: transparent;
}
button{
  cursor: pointer;
}
.mask {
  display: flex;
  position: fixed;
  width: 100vw;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  align-items: center;
  justify-content: center;

  .modal {
    max-width: 460px;
    width: 100%;
    display: flex;
    padding: 15px 30px;
    background: #ffffff;
    border-radius: 15px;
    position: relative;

    .xClose {
      position: absolute;
      top: 15px;
      right: 15px;
      cursor: pointer;
    }

    .list {
      display: flex;
      flex-direction: column;
      width: 100%;

      .listTitle {
        margin: 30px auto;
      }

      .listItem {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        border-bottom: 1px solid #c4c4c4;
        padding-bottom: 5px;

        .controls {
          display: flex;
          align-items: center;
        }

        &:last-of-type {
          border: none;
        }

        .taskName {
          padding: 5px;
        }

        .activeTask {
          text-decoration: line-through;
          opacity: 0.7;
          pointer-events: none;
        }

        input[type="checkbox"] {
          cursor: pointer;
          width: 20px;
          height: 20px;
        }

        p {
          margin: 0
        }

        .addTask{
          padding: 5px 10px;
          border-radius: 5px;
          border: 1px solid #42b983;
          transition: all 0.4s;
          &:hover{
            background: #42b983;
            color: #ffffff;
          }
        }
      }
    }
  }
}
</style>