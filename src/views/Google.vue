<template>
  <div class="books">
    <div class="book" v-for="(book, index) in books" :key="index">
      <h4>{{ book.title }}</h4>
      <a class="link" :href="book.link"
        ><img class="image" :src="book.imgUrl" :alt="book.title"
      /></a>
      <div class="author">著者:{{ book.author }}</div>
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
            for (let i = 0; i <= data.items.length - 1; i++) {
              this.books.push({
                title: data.items[i].volumeInfo.title,
                author: data.items[i].volumeInfo.authors,
                imgUrl: data.items[i].volumeInfo.imageLinks.thumbnail,
                link: data.items[i].volumeInfo.previewLink,
              })
            }
            console.log(this.books)
          })
      })
  },
}
</script>
