<template>
  <div class="rakuten-books">
    <h3>Rakuten</h3>
    <div class="books">
      <!--books配列のうち、先頭から３つだけを取り出して表示させる→limitCount-->
      <!--注意！result.vueにコンポーネントとして組み込む際には、result.vueの<style>タグの"scope"を削除すること！-->
      <div v-for="(book, index) in limitCount" :key="index" class="book-info">
        <a :href="book.bookLink"
          ><h4>{{ book.title }}</h4></a
        >
        <a :href="book.bookLink">
          <img class="pic" :src="book.imgPath" :alt="book.title"
        /></a>
        <div class="detail">著作者:{{ book.author }}</div>
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
  methods: {},
  computed: {
    //booksに格納されたデータのうち、0～2(通し番号)までを表示する
    limitCount() {
      return this.books.slice(0, 3)
    },
  },
  created() {
    getDocs(collection(db, "input"))
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.firebaseArray.push({
            ...doc.data(),
          })
        })
      })
      //ここからAPIの処理
      .then(() => {
        fetch(
          //キーワードプロパティの初期値：%E5%A4%AA%E9%99%BD
          `https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404?format=json&keyword=${this.firebaseArray[0].value}&booksGenreId=000&applicationId=1061693305820936277`
        )
          .then((res) => {
            return res.json()
          })
          .then((data) => {
            //dataのうち全部のtitleとLargeImageUrlをbooksにpushしたい
            for (let i = 0; i <= data.Items.length - 1; i++) {
              this.books.push({
                title: data.Items[i].Item.title,
                imgPath: data.Items[i].Item.largeImageUrl,
                bookLink: data.Items[i].Item.itemUrl,
                author: data.Items[i].Item.author
                  ? data.Items[i].Item.author
                  : "不明",
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
<style></style>
