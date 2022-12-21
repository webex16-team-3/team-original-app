<template>
  <div class="it-books">
    <h3>IT BOOKSTORE</h3>
    <div class="books">
      <!--books配列のうち、先頭から３つだけを取り出して表示させる→limitCount-->
      <!--注意！result.vueにコンポーネントとして組み込む際には、result.vueの<style>タグの"scope"を削除すること！-->
      <div v-for="(book, index) in limitCount" :key="index" class="book-info">
        <div v-if="isdataexists === false">
          <h4>{{ book.title }}</h4>
          <a :href="book.bookLink"
            ><img class="pic" :src="book.imgPath" :alt="book.title"
          /></a>
        </div>
        <div v-else>
          <a :href="book.bookLink"
            ><h4>{{ book.title }}</h4></a
          >
          <a :href="book.bookLink"
            ><img class="pic-it" :src="book.imgPath" :alt="book.title"
          /></a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase"
//ページをリロード
const ReloadPage = function () {
  this.data.push("")
}
ReloadPage
export default {
  data() {
    return {
      /*booksの内容をResult.vueに表示させたい
        Result.vueのコンポーネントとしてrakutenAPI.vueをインポート */
      books: [], //{ title: [], ImgPath: [], BookLink: [] },
      firebaseArray: [],
      isdataexists: 0,
    }
  },
  computed: {
    limitCount() {
      return this.books.slice(0, 3)
    },
  },
  methods: {},
  created() {
    getDocs(collection(db, "input"))
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.firebaseArray.push({
            ...doc.data(),
          })
        })
      })
      //ここからAPIにリクエスト
      .then(() => {
        fetch(
          `https://api.itbook.store/1.0/search/${this.firebaseArray[0].value}/`
        )
          .then((res) => {
            return res.json()
          })
          .then((data) => {
            if (data.books.length === 0) {
              this.isdataexists = false
            } else {
              this.isdataexists = true
            }
            //dataのうちimage,isbn13,title,urlをbooksに格納
            for (let i = 0; i <= 2; i++) {
              this.books.push({
                title: data.books[i] ? data.books[i].title : "不明",
                imgPath: data.books[i]
                  ? data.books[i].image
                  : require("../assets/noimage2.gif"),
                bookLink: data.books[i] ? data.books[i].url : "不明",
              })
            }
          })
          .catch((error) => {
            console.error(error)
          })
      })
  },
}
</script>
