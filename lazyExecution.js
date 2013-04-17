/*
 * lazyExecution.js (http://github.com/shoyan/lazyExecution.js)
 *
 * 遅延実行を行います。
 * 指定された時間の間は何度実行されても、一度しか処理を行いません。
 * インクリメンタルサーチなどに最適。
 *
 * Version 0.0.1  Copyright (c) 2013 Shohei Yamasaki
 *
 * licensed under the MIT licenses:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * 以下のページを参考にさせてもらいました。
 * http://bicycle.life.coocan.jp/takamints/index.php/techtips/delayedExecOnce
 */
lazyExecution = function() {
  // jobを格納する
  var que = {};

  return {
    register: function (job, time) {
      //タイムアウト登録されているならキャンセル
      if(job in que) {
        window.clearTimeout(que[job]);
      }
      //タイムアウト登録する
      que[job] = window.setTimeout(
        function() {
        //実行前にタイマーIDをクリア
        delete que[job];
        //登録処理を実行
        try {
          job.call();
        } catch(e) {
          console.log("EXCEPTION CAUGHT : " + job);
        }
      }, time);
    }
  };

}();
