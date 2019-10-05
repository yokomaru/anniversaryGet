function anniversaryGet() {
  // URLを記述
  var url = "https://zatsuneta.com/category/anniversary.html";
  
  // 対象のURLにアクセス
  var fetch = UrlFetchApp.fetch(url);
  
  //HTML文を文字列として取得
  var html = fetch.getContentText();

  // <div class="article">で始まる</div>で終わ文字列の中で最初に見つかったものを文字列で返す。
  var data = Parser.data(html).from('<div class="article">').to('</div>').build();

  // data内のh3タグの内容を取得(タイトル)
  var title = Parser.data(data).from('<h3>').to('</h3>').build();
 
  // <a><li>タグ内の記念日を配列として取得
  var day = Parser.data(data).from('">').to('</a></li>').iterate();
  // var day2 = Parser.data(data).from('<a').to('</a></li>').iterate();

  // 取得できているか確認
  Logger.log(day);
  Logger.log(title);
  Logger.log(day.join('、'));

  postSlack(title);
  postSlack(day.join('、'));
}

function postSlack(text){
  // SlackAPI側で設定したWebhookURLを記入
  var url = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
  var options = {
    "method" : "POST",
    "headers": {"Content-type": "application/json"},
    "payload" : '{"text":"' + text + '"}'
  };
  UrlFetchApp.fetch(url, options);
}
