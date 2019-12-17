<template >
  <div class="container" @click="removeContext">
    <select class="form-control form-control-sm" v-model="selectState">
      <option selected>By name</option>
      <option>By price</option>
    </select>

    <!-- User list -->
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Items</th>
          <th scope="col">Price</th>
        </tr>
      </thead>
      <tbody>
        <tr  @contextmenu.prevent="handler" v-for="user in sortedUsersList" :key="user.name" @click="selectUser(user, $event)" @dblclick="$router.push('/alseco_test/' + user.name)">
          <td>{{ user.name }}</td>
          <td>{{ user.itemsLength }}</td>
          <td>{{ user.priceSum }}</td>
        </tr>
      </tbody>
    </table>

    <button
      type="button"
      class="btn btn-link"
      ref="showForm"
      v-show="!formVisibilityState"
      @click="formVisibilityState = true"
    >Add</button>



  <!-- " -->
    <button
      ref="delBtn"
      type="button"
      v-show="selectedUsers.length && contextMenu "
      class="mybtn btn btn-danger"
      @click="showConfirm"
    >Remove</button>

    <transition name="fade">
      <div class="add-form p-3" v-show="formVisibilityState">
        <form>
          <div class="form-group">
            <label>
              Lastname
              <input v-model="lastname" type="text" class="form-control" />
            </label>
          </div>
          <div class="form-group">
            <label>
              Firstname
              <input v-model="name" type="text" class="form-control" />
            </label>
          </div>
          <div class="form-group">
            <label>
              Email
              <input v-model="email" type="email" class="form-control" />
            </label>
          </div>
        </form>

        <button class="btn btn-success" @click="addUser">Save</button>
        <button class="btn btn-danger ml-3" @click="formVisibilityState = false">Cancel</button>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  props: ["usersList"],
  data() {
    return {
      contextMenu: false,
      selectState: "By name",
      formVisibilityState: false,
      users: this.usersList,
      email: "",
      lastname: "",
      name: "",
      selectedUsers: []
    };
  },
  methods: {
    removeContext(){
      this.contextMenu = false
    },
    handler(event){
      this.contextMenu = true
      this.$refs.delBtn.style.top = event.clientY + 'px'
      this.$refs.delBtn.style.left = event.clientX + 'px'
    },
    selectUser(user, event){
      if(this.selectedUsers.includes(user)){
        this.selectedUsers = this.selectedUsers.filter(userEl => {
          if(user == userEl) return 
          else return user
        })

        event.target.parentElement.classList.remove('bg-dark', 'text-white')
      } else {
        event.target.parentElement.classList.add('bg-dark', 'text-white')
        this.selectedUsers.push(user)
      }
    },
    addUser() {
      if (this.lastname.trim() && this.name.trim() && this.email.trim()) {
        const user = {
          name: this.name,
          lastname: this.lastname,
          email: this.email,
          items: [],
          itemsLength: 0,
          priceSum: Number()
        };

        this.name = this.email = this.lastname = ""
        this.formVisibilityState = false;
        this.$parent.$data.usersList.push(user);
      }
    },
    showConfirm(){
      let confrimState = confirm('Are u sure?')

      if(confrimState){
          this.selectedUsers.forEach(selectedUser => {
            this.$parent.$data.usersList = this.users =  this.$parent.$data.usersList.filter( user => {
              if (user == selectedUser) return 
              else return user
            })
          });

          this.selectedUsers.length = 0
        
      }
    }
  },
  computed: {
    sortedUsersList() {
      if (this.selectState == "By name") {
        let newList = this.users.sort((a, b) => {
          let nameA = a.name.toLowerCase(),
              nameB = b.name.toLowerCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0; 
        });

        return newList;
      } else if(this.selectState == 'By price'){
        let newList = this.users.sort((a,b) => {
          let priceSumA = a.priceSum,
              priceSumB = b.priceSum;

          if (priceSumA < priceSumB) return 1;
          if (priceSumA > priceSumB) return -1;
          return 0; 
        }) 

        return newList
      }
    }
  }
};
</script>

<style>
.mybtn{
  position: absolute;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>

