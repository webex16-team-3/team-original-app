<template>
  <div class="container">
    <div class="side-menu">
      <div class="site-name">ここにサイト名を入れます。</div>
      <div class="menu-lists">
        <h3>Menu</h3>
        <ul>
          <li id="menu-top" @click="gotohome()">Top</li>
        </ul>
      </div>
    </div>
    <div class="main-contents">
      <div class="books-lists">
        <div class="amazon-books">
          <h3>Amazon</h3>
          <div class="books">
            <div
              v-for="(amazonbook, index) in amazonbooks"
              :key="index"
              class="book-info"
            >
              <h4>{{ amazonbook.title }}</h4>
              <div class="pic">本の画像</div>
              <div class="detail">著作者:{{ amazonbook.author }}</div>
            </div>
          </div>
        </div>
        <div class="rakuten-books">
          <h3>Rakuten</h3>
          <div class="books">
            <div
              v-for="(rakutenbook, index) in rakutenbooks"
              :key="index"
              class="book-info"
            >
              <h4>{{ rakutenbook.title }}</h4>
              <div class="pic">本の画像</div>
              <div class="detail">著作者:{{ rakutenbook.author }}</div>
            </div>
          </div>
        </div>
        <div class="google-books">
          <h3>Google</h3>
          <div class="books">
            <div
              v-for="(googlebook, index) in googlebooks"
              :key="index"
              class="book-info"
            >
              <h4>{{ googlebook.title }}</h4>
              <div class="pic">本の画像</div>
              <div class="detail">著作者:{{ googlebook.author }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
    {{ firebaseArray[0].value }}
  </div>
</template>

<script>
import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase"

export default {
  data() {
    return {
      amazonbooks: [
        { index: 1, title: "a本のタイトル１", author: "太郎" },
        { index: 2, title: "a本のタイトル２", author: "次郎" },
        { index: 3, title: "a本のタイトル３", author: "三郎" },
      ],
      rakutenbooks: [
        { index: 1, title: "r本のタイトル１", author: "太郎" },
        { index: 2, title: "r本のタイトル２", author: "次郎" },
        { index: 3, title: "r本のタイトル３", author: "三郎" },
      ],
      googlebooks: [
        { index: 1, title: "g本のタイトル１", author: "太郎" },
        { index: 2, title: "g本のタイトル２", author: "次郎" },
        { index: 3, title: "g本のタイトル３", author: "三郎" },
      ],

      firebaseArray: [],
      inputValue: "",
    }
  },
  methods: {
    gotohome: function () {
      window.location.href = "http://localhost:8080/"
    },
  },
  created() {
    getDocs(collection(db, "input")).then((snapshot) => {
      snapshot.forEach((doc) => {
        console.log(doc.data())
        this.firebaseArray.push({
          ...doc.data(),
        })
      })
    })
  },
}
</script>
<style scoped>
.container {
  /*視覚整形モデル*/
  display: flex;
  /*背景*/
  background-color: deepskyblue;
}
.main-contents {
  /*ボックスモデル*/
  width: 85%;
  height: 100%;
  /*背景*/
  background-color: bisque;
}
.side-menu {
  /*ボックスモデル*/
  width: 15%;
  /*背景*/
  background-color: gainsboro;
}

.menu-lists ul {
  list-style: none;
}

ul li {
  display: inline;
  text-decoration: underline;
}

ul li:hover {
  /*テキスト*/
  color: white;
  font-weight: bold;
  /*その他*/
  cursor: pointer;
}

.books-lists {
  /*ボックスモデル*/
  margin: 0 3%;
  height: 100%;
  /*背景*/
}

.books {
  /*視覚整形モデル*/
  display: flex;
  /*大きさ*/
  height: 33vh;
  /*背景*/
  background-color: aqua;
}

.book-info {
  width: 30%;
  margin-left: 2vw;
}
.book-info h4 {
  font-size: 0.8rem;
}
.pic {
  /*視覚整形モデル*/
  float: left;
  /*ボックスモデル*/
  width: 50%;
  height: 24vh;
  /*背景*/
  background-color: rgb(172, 172, 172);
}
</style>
