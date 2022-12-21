<template>
  <!--mainタグはページ全体-->
  <main class="main">
    <!--背景画像+サイト名-->

    <div class="home-pic">
      <div class="name">
        <h1>BOOK-<br />COMPARING</h1>
      </div>
    </div>

    <!--ページのコンテンツ部分-->
    <section class="contents">
      <!--センテンス部分-->
      <div class="sentence">
        <p>心に浮かんだ言葉を<span class="keywords">検索</span>、</p>
        <p>サイトごとの情報を一覧で<span class="keywords">比較</span>。</p>
        <p>
          あなたにぴったりの<span class="keywords">本</span>が、きっと見つかる。
        </p>
      </div>

      <!--検索部分-->
      <div class="search">
        <input
          type="text"
          placeholder="enter any keywords?"
          class="search-box"
          id="search-box"
          @keydown.enter="displayContent()"
        />
        <button class="search-button" autofocus @click="displayContent()">
          search
        </button>
      </div>
    </section>
  </main>
</template>

<script>
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../firebase"
export default {
  data() {
    return {
      inputvalue: "",
    }
  },
  methods: {
    displayContent: function () {
      const element = document.getElementById("search-box")
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
@font-face {
  font-family: "Yomogi";
  src: url("../assets/Yomogi-Regular.ttf") format("truetype");
}
@font-face {
  font-family: "Bradley Hand";
  src: url("../assets/bradley-hand-itc.ttf") format("truetype");
}

.home-pic {
  background-image: url(../assets/page-top.jpg);
  background-size: cover;
  background-position: center top;
  min-height: 100vh;
}
.name h1 {
  color: #fffcfc;
  font-size: 60px;
  font-weight: lighter;
  font-family: "Bradley Hand";
  line-height: 60px;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  text-align: left;
  padding: 130px 10px 50px 80px;
  margin-top: 0px;
}

.contents {
  background: #964340;
}
.sentence {
  color: #fffcfc;
  font-size: 25px;
  font-family: "Yomogi";
  text-align: center;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  line-height: 40px;
  padding-top: 100px;
  padding-bottom: 40px;
}

.keywords {
  color: #cc934a;
}
.search {
  text-align: center;
  font-family: "Bradley Hand";
  padding-bottom: 200px;
}

.search-box {
  font-family: "Bradley Hand", "Yomogi";
  width: 200px;
  border-radius: 5px;
  border: 1px solid #000000;
  margin-right: 20px;
  padding: 12px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.search-button {
  background-color: #cc934a;
  color: #000000;
  font-family: "Bradley Hand";
  font-weight: 600;
  border-radius: 5px;
  border: 1px solid #000000;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 7px;
}

.search-button:hover {
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.3);
  background-color: bisque;
}
</style>
