<template>
  <div class="container">
    <div class="side-menu">
      <div class="site-name">
        <div>BOOK</div>
        <div>COMPARING</div>
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
          @keydown.enter="displayContent()"
        />
        <button @click="displayContent()">Search</button>
      </div>
      <div class="books-lists">
        <!-- ここから楽天の本の表示 -->
        <RakutenAPI />
        <!-- ここまで楽天の本の表示 -->
        <!-- ここからGoogleの本の表示 -->
        <GoogleAPI />
        <!-- ここまでGoogleの本の表示 -->
        <!-- ここからitBooksの本の表示 -->
        <itBooksAPI />
        <!-- ここまでAmazonの本の表示 -->
      </div>
    </div>
  </div>
</template>

<script>
import { doc, updateDoc, collection, getDocs } from "firebase/firestore"
import { db } from "../firebase"
import RakutenAPI from "@/components/RakutenAPI.vue"
import GoogleAPI from "@/components/GoogleAPI.vue"
import itBooksAPI from "@/components/itBooksAPI.vue"

export default {
  components: { RakutenAPI, GoogleAPI, itBooksAPI },
  data() {
    return {
      firebaseArray: [],
      inputValue: "",
    }
  },
  methods: {
    gotohome: function () {
      window.location.href = "https://team-original-app-72914.web.app/"
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
          window.location.href =
            "https://team-original-app-72914.web.app/result"
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
  align-items: stretch;
}
.main-contents {
  width: 100%;
  background-color: #eceff7;
}
.side-menu {
  width: 15%;
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
  margin-top: 33px;
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
  height: 400px;
  background-color: #eceff7;
}

.book-info {
  width: 30%;
  margin-left: 2vw;
  font-family: "Yomogi";
}

.book-info h4 {
  font-size: 1.2rem;
  text-decoration: underline;
}

.books img {
  width: 180px;
  height: 180px;
}

.pic {
  float: left;
  background-color: #eceff7;
}

.pic:hover {
  transform: scale(1.2);
}

.pic-it {
  float: left;
  width: 100%;
  transform: scale(1.4);
}

.pic-it:hover {
  transform: scale(1.6);
}

.detail {
  margin-top: 15px;
  display: inline-block;
  width: 200px;
  height: 30px;
}

.rakuten-books {
  border-top: 1px solid;
  margin-top: 10px;
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
  margin-top: 10px;
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
  margin-top: 10px;
}

.it-books h3 {
  width: 10rem;
  background-color: #964340;
  text-align: center;
  color: white;
  font-family: "Bradley Hand";
}
</style>
