<template>
  <div class="google-books">
    <h3>Google</h3>
    <div class="books">
      <div class="book-info" v-for="(book, index) in books" :key="index">
        <a :href="book.link"
          ><h4>{{ book.title }}</h4></a
        >
        <a :href="book.link"
          ><img class="pic" :src="book.imgUrl" :alt="book.title"
        /></a>
        <div class="detail">著者:{{ book.author }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { collection, getDocs } from "@firebase/firestore"
import { db } from "../firebase"
export default {
  data() {
    return {
      books: [],
      firebaseArray: [],
    }
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
      .then(() => {
        fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${this.firebaseArray[0].value}&maxResults=3&startIndex=0`
        )
          .then((res) => {
            return res.json()
          })
          .then((data) => {
            for (let i = 0; i <= 2; i++) {
              this.books.push({
                title: data.items[i].volumeInfo.title,
                author: data.items[i].volumeInfo.authors
                  ? data.items[i].volumeInfo.authors[0]
                  : "不明",
                imgUrl: data.items[i].volumeInfo.imageLinks
                  ? data.items[i].volumeInfo.imageLinks.thumbnail
                  : require("../assets/noimage2.gif"),
                link: data.items[i].volumeInfo.previewLink,
              })
            }
          })
      })
  },
}
</script>
