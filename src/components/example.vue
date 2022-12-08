<template>
  <div class="search">
    <input type="text" placeholder="キーワードを入力してね" id="input-words" />
    <button @click="search">検索</button>
  </div>
  <div class="bookslineup">
    <table border="1" class="bookstable">
      <tr>
        <th>Google</th>
        <th>Rakuten</th>
        <th>Amazon</th>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      booksDatasets: [],
    }
  },
  props: ["data"],
  methods: {
    //入力情報を取得してデータを探して、持ってきます
    search: function () {
      //inputValueはinputフォームの入力値が入っている. これをAPI側に検索として渡すのかな？
      const inputBox = document.getElementById("input-words")
      const inputValue = inputBox.value
      console.log("「" + inputValue + "」" + "で検索しています...")

      //booksDatasetsの中身が残っていたら初期化する
      if (this.booksDatasets.length != 0) {
        this.booksDatasets = []
        console.log("前回の検索結果を消去し、更新しました。")
      }

      //Googleのデータを取得
      const googleDatasets = ["G本1", "G本2", "G本3"]
      this.booksDatasets.push(googleDatasets)
      //Rakutenのデータ
      const RakutenDatasets = ["R本1", "R本2", "R本3"]
      this.booksDatasets.push(RakutenDatasets)
      //Amazonのデータ
      const AmazonDatasets = ["A本1", "A本2", "A本3"]
      this.booksDatasets.push(AmazonDatasets)

      console.log("本の取得データは以下のようになりました")
      console.log(this.booksDatasets)

      //さあ、次はこのデータをbookslineup.vueにわたしたいのだが,,,
      //googleのデータベースにアップしてそれを受け取る形でいいのか？
    },
  },
}
</script>

<style scoped>
.search {
  /*背景*/
  background-color: #ffb5f8;
  /*テキスト*/
  text-align: center;
}
.bookslineup {
  /*背景*/
  background-color: #5bd3bf;
  /*テキスト*/
  text-align: center;
}
.bookstable {
  width: 100%;
}
</style>
