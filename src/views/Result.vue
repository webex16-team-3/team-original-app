<template>
  <div class="container">
    <div class="side-menu">
      <div class="site-name">
        <div>BOOK</div>
        <div>COMPARER</div>
      </div>
      <div class="menu-lists">
        <h3>Menu</h3>
        <ul>
          <li id="menu-top" @click="gotohome()">Top</li>
        </ul>
      </div>
    </div>
    <div class="main-contents">
      <div class="form">
        <input
          type="search"
          placeholder="enter any keywords?"
          id="input-box"
          class="input-box"
          :value="firebaseArray[0].value"
        />
        <button @click="displayContent()">Search</button>
      </div>
      <div class="books-lists">
        <!-- ここから楽天の本の表示 -->
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
        <!-- ここまで楽天の本の表示 -->
        <!-- ここからGoogleの本の表示 -->
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
        <!-- ここまでGoogleの本の表示 -->
        <!-- ここからITBooksの本の表示 classを"it-Booksに変更" -->
        <itBooksAPIVue></itBooksAPIVue>
        <!--<div class="it-books">
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
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import itBooksAPIVue from "@/components/itBooksAPI.vue"
import { doc, updateDoc, collection, getDocs } from "firebase/firestore"
import { db } from "../firebase"

export default {
  components: { itBooksAPIVue },
  data() {
    return {
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
      amazonbooks: [
        { index: 1, title: "a本のタイトル１", author: "太郎" },
        { index: 2, title: "a本のタイトル２", author: "次郎" },
        { index: 3, title: "a本のタイトル３", author: "三郎" },
      ],

      firebaseArray: [],
      inputValue: "",
    }
  },
  methods: {
    gotohome: function () {
      window.location.href = "http://localhost:8080/"
    },
    displayContent: function () {
      const element = document.getElementById("input-box")
      console.log(element.value)
      if (element.value != "") {
        const valueRef = doc(db, "input", "o3oP8W2UNxaw5Nhx9KED") //データベース"db"のコレクション"input"のドキュメント"o..."フィールド
        const updateValue = updateDoc(valueRef, {
          value: element.value,
        })

        //firebaseに反映させる → 画面遷移する(非同期処理)
        updateValue.then(function () {
          window.location.href = "http://localhost:8080/result"
          console.log("画面遷移します")
        })
      } else {
        alert("検索キーワードを入力してください")
      }
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

<style>
@font-face {
  font-family: "Bradley Hand";
  src: url("../assets/bradley-hand-itc.ttf") format("truetype");
}
@font-face {
  font-family: "Yomogi";
  src: url("../assets/Yomogi-Regular.ttf") format("truetype");
}
.container {
  display: flex;
}
.main-contents {
  width: 100%;
  background-color: #eceff7;
}
.side-menu {
  width: 15%;
  height: 1275px;
  background-color: #964340;
  font-size: 1.3rem;
  font-family: "Bradley Hand";
}

.site-name {
  margin-top: 15px;
  text-align: center;
  font-family: "Bradley Hand";
  font-size: 1.5rem;
  color: white;
}

.menu-lists {
  margin-top: 20px;
  border-top: 1px solid white;
  color: white;
}

.menu-lists ul {
  list-style: none;
}

ul li {
  display: inline;
  text-decoration: underline;
}

ul li:hover {
  color: bisque;
  cursor: pointer;
}

.form {
  margin-top: 2vh;
  margin-left: 1vw;
}

.form button {
  margin-left: 3%;
  border-radius: 5px;
  width: 5rem;
  height: 2rem;
  background-color: #cc934a;
  font-family: "Bradley Hand";
  font-size: 1.1rem;
}

.form button:hover {
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.3);
  background-color: bisque;
}

.input-box {
  margin-top: 15px;
  border: solid 1px;
  width: 14rem;
  height: 2.3rem;
  font-size: 1.2rem;
  font-family: "Bradley Hand", "Yomogi";
}

.books-lists {
  margin: 0 3%;
}

.books {
  display: flex;
  height: 33vh;
  background-color: #eceff7;
}

.book-info {
  width: 30%;
  margin-left: 2vw;
  font-family: "Yomogi";
}

.book-info h4 {
  font-size: 0.8rem;
  text-decoration: underline;
}

.pic {
  float: left;
  width: 150px;
  height: 180px;
  background-color: rgb(172, 172, 172);
}

.rakuten-books {
  border-top: 1px solid;
  margin-top: 30px;
}

.rakuten-books h3 {
  width: 7rem;
  background-color: #964340;
  text-align: center;
  color: white;
  font-family: "Bradley Hand";
}

.google-books {
  border-top: 1px solid;
  margin-top: 30px;
}

.google-books h3 {
  width: 7rem;
  background-color: #964340;
  text-align: center;
  color: white;
  font-family: "Bradley Hand";
}

.it-books {
  border-top: 1px solid;
  margin-top: 30px;
}

.it-books h3 {
  width: 10rem;
  background-color: #964340;
  text-align: center;
  color: white;
  font-family: "Bradley Hand";
}
</style>
