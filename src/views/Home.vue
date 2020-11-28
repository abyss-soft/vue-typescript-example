<template>
  <div class="home">
    <div class="home_left">
      <label>
        <input class="home__input" type="text" v-model="searchText" />
      </label>
      <ul>
        <li class="home__out" v-for="name of filterData" :key="name.id">
          <button class="home__button" @click="addItem(name)">[+]</button>
          {{ name.name }} - {{ name.items.name }}
        </li>
      </ul>
    </div>
    <div class="home_right">
      <ul>
        <li class="home__out" v-for="name of selectedData" :key="name.id">
          <button class="home__button" @click="removeItem(name)">[-]</button>
          {{ name.name }} - {{ name.items.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

function searchInto(searchString: string, searchText: string) {
  const pattern = new RegExp(searchText, "g");
  return (searchString.match(pattern) || []).length;
}

interface Item {
  items: {
    name: string;
  };
  name: string;
  action: string;
}

@Component({})
export default class Home extends Vue {
  searchText!: string;

  data() {
    return {
      searchText: ""
    };
  }

  addItem(item: Item) {
    if (item) {
      this.$store.commit("setSelectDataElements", item);
      this.$store.commit("removeLeftToRight", item);
    }
  }

  removeItem(item: Item) {
    this.$store.commit("removeRightToLeft", item);
  }

  get filterData() {
    return this.$store.getters.getDataElements
      .filter(
        (name: Item) =>
          name.name.indexOf(this.searchText) !== -1 ||
          name.items.name.indexOf(this.searchText) !== -1
      )
      .sort((a: Item, b: Item) => {
        if (
          searchInto(a.name + a.items.name, this.searchText) >
          searchInto(b.name + b.items.name, this.searchText)
        )
          return -1;
        if (
          searchInto(a.name + a.items.name, this.searchText) <
          searchInto(b.name + b.items.name, this.searchText)
        )
          return 1;
        return 0;
      });
  }
  get selectedData() {
    return this.$store.getters.getSelectDataElements;
  }
}
</script>
<style lang="scss">
.home {
  display: flex;
}

.home_left {
  width: 45vw;
  border: 1px solid #b4cbe8;
}

.home_right {
  margin-left: 2rem;
  border: 1px solid #b8b3b3;
  width: 45vw;
}

.home__input {
  outline: none;
  width: 100%;
  box-sizing: border-box;
  font-size: 1.3rem;
}

.home__out {
  font-size: 1.3rem;
  color: #02275c;
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
}

.home__button {
  margin-right: 0.5rem;
}
</style>
