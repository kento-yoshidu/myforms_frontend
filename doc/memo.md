# テストの書き方

## テストの内容の書き方

### セマンティックな単語を使用しよう

「値を入力した時」ではなく、「メールアドレスを入力した時」とする

### 受動態ではなく、能動態で書こう

「フォームに名前が入力された時」ではなく、「フォームに名前を入力した時」とする

# WAI-ARIA

## WAI-ARIAロール

ARIAロールはセマンティックな役割を補完する。現在のHTMLの多くのタグには暗黙のロールが存在しているため、ロールを記述する頻度は少ないと思う。

## WAI-ARIAステート

ARIAステートは現在の状態を表す。`aria-disabled="true"`ならフォームの入力状態が不完全であることを示す。

## WAI-ARIAプロパティ

プロパティ（性質）を表す。`aria-required="true"`は入力必須、というイメージ。

https://developer.mozilla.org/ja/docs/Learn/Accessibility/WAI-ARIA_basics


# WAI-ARIAステート

## aria-disabled

[Accessible Rich Internet Applications (WAI-ARIA) 1.1 日本語訳](https://momdo.github.io/wai-aria-1.1/#aria-disabled)

`aria-disabled="true"`とすることで、その要素が無効であることを示す。役割を伝えるだけで、`disabled`のように**実際に要素を無効化する機能はない**。

```html
<button
  disabled
  aria-disabled="true"
>
  送信する
</button>
```

そもそも、いわゆる「送信ボタン」の類に`disabled`を付けていいかを考える所からスタートする。`disabled`を付けるとTabキーでは移動できなくなり、ユーザーがボタンの存在を認識できなくなる可能性がある。ましてや、スクリーンリーダーで読み取れない可能性も高い。

上述したように`aria-disabled="true"`を付けてもボタンは無効化されないので、Tabキーで移動させることがでいるし、支援機能も要素を扱うことができる。「ボタンの無効化/有効化」を切り替えるのはJavaScriptを用いて実現する。
