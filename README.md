# ゴミ通知

[53カレ](https://www.53cal.jp/) から届いたメールを GASを通してラインに通知する

メールアドレスやトークンの情報は GASのスクリプトプロパティに保存しておく

**追記**

53カレがサービス終了したため、GOMI.TODAYに変更
http://matsuyama.gomi.today/

## 使用したコマンド

### claspをインストール

`npm i @google/clasp -g`

### 依存ライブラリをインストール

```
cd template
npm install
```

### デプロイしたい時

```shell
clasp login
npm run build
clasp push
```
