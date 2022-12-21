<template>
  <div class="it-books">
    <h3>IT BOOKSTORE</h3>
    <div class="books">
      <!--books配列のうち、先頭から３つだけを取り出して表示させる→limitCount-->
      <!--注意！result.vueにコンポーネントとして組み込む際には、result.vueの<style>タグの"scope"を削除すること！-->
      <div v-for="(book, index) in limitCount" :key="index" class="book-info">
        <h4>{{ book.title }}</h4>
        <img class="pic" :src="book.imgPath" :alt="book.title" />
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
          console.log(doc.data())
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
            console.log("fetch1回目完了")
            console.log(data)
            //dataのうちimage,isbn13,title,urlをbooksに格納
            for (let i = 0; i <= data.books.length - 1; i++) {
              this.books.push({
                title: data.books[i].title,
                imgPath: data.books[i].image,
                bookLink: data.books[i].url,
                isbn: data.books[i].isbn13,
              })
            }
            console.log(this.books)
          })
          .catch((error) => {
            console.error(error)
          })
      })
  },
}
</script>
<style></style>
