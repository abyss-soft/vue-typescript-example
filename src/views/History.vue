<template>
  <div class="history">
    <ul>
      <li class="home__out" v-for="(name, id) of filterData" :key="id">
        <div class="history__table">
          <p class="history__table-data">id: {{ name.item.id }}</p>
          <p class="history__table-data">Name: {{ name.item.name }}</p>
          <p class="history__table-data">{{ name.action }}</p>
          <p class="history__table-data">{{ name.time }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

interface Item {
  item: {
    action: string;
  };
  name: string;
  action: string;
}

@Component({})
export default class Home extends Vue {
  selectData: Array<object> = [];

  get filterData() {
    if (this.$route.query.name === "add") {
      this.selectData = [];
      this.$store.getters.getHistory.forEach((item: Item) => {
        if (item.action === "Добавление") this.selectData.push(item);
      });
      return this.selectData;
    }
    if (this.$route.query.name === "remove") {
      this.selectData = [];
      this.$store.getters.getHistory.forEach((item: Item) => {
        if (item.action === "Удаление") this.selectData.push(item);
      });
      return this.selectData;
    }
    return this.$store.getters.getHistory;
  }
}
</script>
<style lang="scss">
.history__table {
  display: flex;
  justify-content: space-around;
  width: 100%;
  border: 1px solid #e4e2e2;
}

.history__table-data {
  margin: 0 1rem;
}
</style>
