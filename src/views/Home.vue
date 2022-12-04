<template>
  <div class="home-pic">写真</div>
  <div class="form">
    <input
      type="text"
      placeholder="キーワードを入力してね"
      id="input-box"
      class="input-box"
    />
    <button>本を探す</button>
  </div>
  <div class="recommend">
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

<script></script>

<style scoped>
.home-pic {
  /*ボックスモデル*/
  height: 450px;
  /*背景*/
  background-color: antiquewhite;
  /*テキスト*/
  text-align: center;
}
.form {
  /*ボックスモデル*/
  margin-top: 60px;
  /*テキスト(inputとbuttonも真ん中に)*/
  text-align: center;
}
.input-box {
  /*ボックスモデル*/
  border: solid 1px;
  border-radius: 10px;
  width: 13rem;
  height: 3rem;
}
.lists {
  /*ボックスモデル*/
  margin-right: 5rem;
}
.recommend {
  /*ボックスモデル*/
  margin-top: 50px;
  /*テキスト*/
  text-align: center;
}

.recommend ul {
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
  text-decoration: underline;
}
</style>
