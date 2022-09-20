<template>
  <div class="home">
    <UserList title="Список пользователей"/>
  </div>
</template>

<script>
// @ is an alias to /src
import UserList from '@/components/UserList.vue'

export default {
  name: 'HomeView',
  components: {
    UserList
  }
}
</script>
