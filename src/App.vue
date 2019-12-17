<template>
  <div id="app"  class="container pt-2">
    <router-view :usersList="usersList"></router-view>
  </div>
</template>
<script>
export default {
  name: "app",
  data(){
    return {
      usersList: [
         {
          name: "Tony",
          lastname: "Hawk",
          email: "tony@ex.com",
          items: [
            {
              title: "Logitech 175xd",
              price: 12000,
              category: 'Mouse',
              date: '14/09/2019'
            }
          ],
          itemsLength: 0,
          priceSum: 0
        },
        {
          name: "Alex",
          lastname: "Mercer",
          email: "alex@ex.com",
          items: [
            {
              title: "Asus ROG",
              price: 250000,
              category: 'Notebook',
              date: '19/09/2019'
            },
            {
              title: "Logitech 175xd",
              price: 12000,
              category: 'Mouse',
              date: '14/09/2019'
            }
          ],
          itemsLength: 0,
          priceSum: 0
        },
        {
          name: "John",
          lastname: "Wick",
          email: "john@ex.com",
          items: [
            {
              title: "Apple iPhone ",
              price: 900000,
              category: 'Phone',
              date: '14/09/2019'
            }
          ],
          itemsLength: 0,
          priceSum: 0
        },
        {
          name: "Adele",
          lastname: "Hello",
          email: "adele@ex.com",
          items: [
            {
              title: "Apple Macbook",
              price: 60000,
              category: 'Notebook',
              date: '16/09/2019'
            },
            {
              title: "Canon x400",
              price: 80000,
              category: 'Camera',
              date: '04/09/2019'
            },
            {
              title: "Apple Airpods",
              price: 70000,
              category: 'Accessories',
              date: '10/09/2019'
            }
          ],
          itemsLength: 0,
          priceSum: 0
        }
      ]
    }
  },
  methods: {
    computeUsers() {
      this.usersList.forEach(user => {
        user.priceSum = 0
        user.items.forEach(item => {
          user.priceSum += Number(item.price);
          user.itemsLength = user.items.length;
        });
      });
    }
  },
  created(){
    this.computeUsers();
  }
};
</script>
<style>
</style>
