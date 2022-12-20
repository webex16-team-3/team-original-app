<template>
  <div class="home-pic">
    <img src="../assets/books.jpeg" />
  </div>
  <div class="form">
    <input
      type="text"
      placeholder="キーワードを入力してね"
      id="input-box"
      class="input-box"
    />
    <button @click="displayContent">本を探す</button>
  </div>
  <div class="recommend-words">
    <h2>おすすめのキーワード</h2>
    <div class="lists">
      <ul>
        <li>怖い</li>
        <li>かっこいい</li>
        <li>少女漫画</li>
      </ul>
    </div>
  </div>
</template>

<script>
//import RakutenAPIVue from "@/components/RakutenAPI.vue"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../firebase"

export default {
  //components: { RakutenAPIVue },
  data() {
    return {
      inputvalue: "",
    }
  },
  methods: {
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
}
</script>

<style scoped>
.home-pic {
  /*ボックスモデル*/
  height: 450px;
  /*背景*/
  background-color: antiquewhite;
  /*テキスト*/
  text-align: center;
}
.home-pic img {
  height: 100%;
}
.form {
  /*ボックスモデル*/
  margin-top: 60px;
  /*テキスト(inputとbuttonも真ん中に)*/
  text-align: center;
}
.form button {
  /*ボックスモデル*/
  margin-left: 3%;
  border-radius: 5px;
  /*背景*/
  background-color: rgb(230, 230, 230);
}
.form button:hover {
  /*ボックスモデル*/
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.3);
}
.input-box {
  /*ボックスモデル*/
  border: solid 1px;
  border-radius: 10px;
  width: 18rem;
  height: 3rem;
  /*テキスト*/
  font-size: 1.2rem;
}
.lists {
  /*ボックスモデル*/
  margin-right: 5rem;
}
.recommend-words {
  /*ボックスモデル*/
  margin-top: 50px;
  /*テキスト*/
  text-align: center;
}

.recommend-words ul {
  /*視覚整形モデル*/
  display: flex;
  /*ボックスモデル*/
  justify-content: center;
  /*テキスト*/
  list-style: none;
}
ul li {
  /*ボックススタイル*/
  margin-left: 5vw;
  /*テキスト*/
  font-size: 1.3rem;
}

ul li:hover {
  /*テキスト*/
  color: rgb(168, 168, 168);
  font-weight: bold;
  /*その他*/
  cursor: pointer;
}
</style>
