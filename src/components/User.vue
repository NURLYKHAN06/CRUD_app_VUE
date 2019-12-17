<template>
  <div>

    <button class="btn btn-link text--primary" @click="$router.push('/alseco_test')">Back to list</button>

    <h1>{{ user.name + ' ' + user.lastname}}</h1>
    <h2>{{ user.email }}</h2>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">Category</th>
          <th scope="col">Title</th>
          <th scope="col">Date</th>
          <th scope="col">Price</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in user.items" :key="item.title" @click="selectItem(item,$event)">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.date }}</td>
          <td>{{ item.price }}</td>
        </tr>
        <tr>
          <td></td>
          <td class="font-weight-bold">All items sum</td>
          <td></td>
          <td class="font-weight-bold">{{ user.priceSum }}</td>
        </tr>
      </tbody>
    </table>

    
    <div class="edit-form form-inline form-group row w-100 p-3 m-0 d-flex justify-content-center" v-if="selectedItems.length == 1 && editFormState">
      <input type="text" class="form-control" v-model="editedItem.category">
      <input type="text" class="form-control"  v-model="editedItem.title">
      <input type="text" class="form-control"  v-model="editedItem.date" disabled> 
      <input type="text" class="form-control"  v-model="editedItem.price">
    </div>

    <button
      type="button"
      class="btn btn-link d-block mx-auto"
      ref="showForm"
      v-if="!formVisibilityState && selectedItems.length < 1"
      @click="formVisibilityState = true"
    >Add</button>

    <transition name="fade">
      <div class="add-form p-3" v-show="formVisibilityState">
        <form>
          <div class="form-group">
            <label>
              Category
              <input v-model="category" type="text" class="form-control" />
            </label>
          </div>
          <div class="form-group">
            <label>
              Title
              <input v-model="title" type="text" class="form-control" />
            </label>
          </div>
          <div class="form-group">
            <label>
              Price
              <input v-model="price" type="text" class="form-control" />
            </label>
          </div>
        </form>

        <button class="btn btn-success" @click="addItem">Save</button>
        <button class="btn btn-danger ml-3" @click="formVisibilityState = false">Cancel</button>
      </div>
    </transition>


  <div class="btn-group mx-auto d-table">
      <button
      type="button"
      class="btn btn-danger"
      v-show="selectedItems.length > 0"
      @click="showConfirm"
    >Remove</button>

     <button
      type="button"
      class="btn btn-primary"
      v-show="selectedItems.length == 1 && editFormState == false" 
      @click="editItem"
    >Edit</button>
      <button
      type="button"
      class="btn btn-success"
      v-show="selectedItems.length == 1 && editFormState"
      @click="saveItem"
    >Save</button>
    </div>
  </div>
</template>
<script>
import { isNumber } from "util";
export default {
  name: "User",
  props: ["usersList"],
  data() {
    return {

      editFormState: false,
      selectedItems: [],
      formVisibilityState: false,
      users: this.usersList,
      user: Object,
      title: "",
      price: Number(),
      category: "",
      editedItem: {
        category: '',
        title: '',
        price: Number(),
        date: ''
      }
    };
  },
  methods: {
    editItem(){
      this.editFormState = true

      let editedItemObj = this.selectedItems[0]

      this.editedItem = {
        category: editedItemObj.category,
        title: editedItemObj.title,
        price: Number(editedItemObj.price),
        date: editedItemObj.date
      }
    },
    saveItem(){
     let a =  []
     this.user.items.filter((item) => {
        if(this.selectedItems[0] == item){
          a.push(this.editedItem)
        } else a.push(item)
      })

      this.user.items = a
      this.$parent.$data.usersList.forEach(user => {
        if(user.name == this.user.name && user.email && this.user.email){
          user.items = this.user.items
          this.$parent.computeUsers()
          this.initUserData()
          this.editFormState = false
          this.selectedItems.length = 0
          document.querySelectorAll('.bg-dark.text-white')[0].classList.remove('bg-dark', 'text-white')

        }
      })
    },
    showConfirm(){
      let confrimState = confirm('Are u sure?')

      if(confrimState){
          this.selectedItems.forEach(selectedItem => {
            this.user.items = this.user.items.filter( item => {
              if (item == selectedItem) return 
              else return item
            })
          });

          this.selectedItems.length = 0
          this.$parent.$data.usersList.forEach(userData => {
            if(userData == this.user){
              userData.items = this.user.items
              userData.priceSum = 0 
              this.$parent.computeUsers()
            }
          })

      }
    },
    selectItem(item, event){
      if(this.selectedItems.includes(item)){
        this.selectedItems = this.selectedItems.filter(itemEl => {
          if(item == itemEl) return 
          else return item
        })

        event.target.parentElement.classList.remove('bg-dark', 'text-white')
      } else {
        event.target.parentElement.classList.add('bg-dark', 'text-white')
        this.selectedItems.push(item)
      }
    },
    initUserData() {
      this.$parent.$data.usersList.forEach(user => {
        if (this.$route.params.name === user.name) {
          this.user = user;
        }
      });
    },
    addItem() {
      this.price = Number(this.price)

      if (this.title.trim() && this.category.trim() && isNumber(this.price)) {
        let nowDate = new Date();

        const item = {
          category: this.category,
          title: this.title,
          price: this.price,
          date: nowDate.toLocaleDateString("en-FR")
        };

        this.$parent.$data.usersList.forEach(user => {
          if (user.name == this.user.name && user.email == this.user.email) {
            user.items.push(item);

            user.itemsLength++
            user.priceSum += +item.price;
            this.initUserData();
          }
        });


      this.formVisibilityState = false
      this.category = this.title = ''
      this.price = 0

        
      }
    }
  },
  watch: {
    selectedItems(){
      if(this.selectedItems.length == 0){
        this.editFormState = false
      }
    }
  },
  created() {
    this.initUserData();
  }
};
</script>