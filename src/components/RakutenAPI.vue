<template>
  <div>
    <button v-on:click="SearchRakutenBooks">本検索</button>
    <div v-for="(Title, index) in Books.title" v-bind:key="index">
      {{ Title }}
    </div>
    <img
      :src="Img"
      alt="{{ Title }}"
      v-for="(Img, Imgkey) in Books.ImgPath"
      v-bind:key="Imgkey"
    />
  </div>
</template>

<script>
const ReloadPage = function () {
  this.data.push("")
}
ReloadPage
export default {
  data() {
    return {
      Books: { title: [], ImgPath: [] },
      Keywords: ["明治"],
    }
  },
  methods: {
    SearchRakutenBooks: function () {
      fetch(
        //キーワードプロパティの初期値：%E5%A4%AA%E9%99%BD
        `https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404?format=json&keyword=${this.Keyword}&booksGenreId=000&applicationId=1061693305820936277`
      )
        .then((res) => {
          return res.json()
        })
        .then((data) => {
          console.log(data)
          //dataのうち全部のtitleとLargeImageUrlをBooksにpushしたい
          for (let i = 0; i <= data.Items.length - 1; i++) {
            this.Books.title.push(data.Items[i].Item.title)
            this.Books.ImgPath.push(data.Items[i].Item.largeImageUrl)
          }
          console.log(this.Books)
        })
        .catch((error) => {
          console.error(error)
        })
    },
  },
}
</script>
<style></style>
