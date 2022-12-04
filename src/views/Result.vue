<template>
  <div class="container">
    <div class="side-menu">
      <div class="site-name">ここにサイト名を入れます。</div>
      <div class="menu-lists">
        <h3>Menu</h3>
        <ul>
          <li id="menu-top" @click="gotohome()">Top</li>
        </ul>
      </div>
    </div>
    <div class="main-contents">
      <div class="books-lists">
        <div class="amazon-books">
          <h3>Amazon</h3>
          <div class="books">
            <div class="book-info">
              <h4>本のタイトル</h4>
              <div class="pic">本の画像</div>
              <div class="detail">著者名/出版社/名前など</div>
            </div>
            <div class="book-info">
              <h4>本のタイトル</h4>
              <div class="pic">本の画像</div>
              <div class="detail">著者名/出版社/名前など</div>
            </div>
            <div class="book-info">
              <h4>本のタイトル</h4>
              <div class="pic">本の画像</div>
              <div class="detail">著者名/出版社/名前など</div>
            </div>
          </div>
        </div>
        <div class="rakuten-books">
          <h3>Rakuten</h3>
          <div class="books">
            <div class="book-info">
              <h4>本のタイトル</h4>
              <div class="pic">本の画像</div>
              <div class="detail">著者名/出版社/名前など</div>
            </div>
            <div class="book-info">
              <h4>本のタイトル</h4>
              <div class="pic">本の画像</div>
              <div class="detail">著者名/出版社/名前など</div>
            </div>
            <div class="book-info">
              <h4>本のタイトル</h4>
              <div class="pic">本の画像</div>
              <div class="detail">著者名/出版社/名前など</div>
            </div>
          </div>
        </div>
        <div class="google-books">
          <h3>Google</h3>
          <div class="books">
            <div class="book-info">
              <h4>本のタイトル</h4>
              <div class="pic">本の画像</div>
              <div class="detail">著者名/出版社/名前など</div>
            </div>
            <div class="book-info">
              <h4>本のタイトル</h4>
              <div class="pic">本の画像</div>
              <div class="detail">著者名/出版社/名前など</div>
            </div>
            <div class="book-info">
              <h4>本のタイトル</h4>
              <div class="pic">本の画像</div>
              <div class="detail">著者名/出版社/名前など</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    gotohome: function () {
      window.location.href = "http://localhost:8080/"
    },
  },
}
</script>
<style scoped>
.container {
  /*視覚整形モデル*/
  display: flex;
  /*背景*/
  background-color: deepskyblue;
}
.main-contents {
  /*ボックスモデル*/
  width: 85%;
  height: 100%;
  /*背景*/
  background-color: bisque;
}
.side-menu {
  /*ボックスモデル*/
  width: 15%;
  /*背景*/
  background-color: gainsboro;
}

.menu-lists ul {
  list-style: none;
}

ul li {
  display: inline;
  text-decoration: underline;
}

ul li:hover {
  /*テキスト*/
  color: white;
  font-weight: bold;
  /*その他*/
  cursor: pointer;
}

.books-lists {
  /*ボックスモデル*/
  margin: 0 3%;
  height: 100%;
  /*背景*/
}

.books {
  /*視覚整形モデル*/
  display: flex;
  /*大きさ*/
  height: 33vh;
  /*背景*/
  background-color: aqua;
}

.book-info {
  width: 30%;
  margin-left: 2vw;
}
.book-info h4 {
  font-size: 0.8rem;
}
.pic {
  /*視覚整形モデル*/
  float: left;
  /*ボックスモデル*/
  width: 50%;
  height: 25vh;
  /*背景*/
  background-color: rgb(172, 172, 172);
}
</style>
