import { SheetService } from './sheet.service';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let global: any;

global.searchContactMail = (): void => {
  // const query = '"label:ゴミカレンダー"';
  const query = '"53cal-sender@53cal.jp"';

  const start = 0;
  const max = 1;

  const threads = GmailApp.search(query, start, max);
  const messagesForThreads = GmailApp.getMessagesForThreads(threads);

  if (messagesForThreads.length == 0) {
    return;
  }

  const message = messagesForThreads[0][0];

  const messageBody = message.getPlainBody();

  const matchMessageBody = messageBody.match(/.*です/);
  const Chart = messageBody.match(/.*areacalendar.*/);

  //メールの削除
  message.moveToTrash();

  const lineNotifyAccessToken = PropertiesService.getScriptProperties().getProperty(
    'LINE_NOTIFY_ACCESS_TOKEN'
  );

  const url = 'https://notify-api.line.me/api/notify';
  const data = {
    message:
      '\n' +
      matchMessageBody +
      '\n' +
      '一覧\n' +
      Chart +
      '\n\n' +
      '清水地区のカレンダー(公式)\n' +
      'https://www.city.matsuyama.ehime.jp/kurashi/gomi/dashikata/gomicalender/2020gomikaretikubetu.files/2020.shimizu.pdf',
  };
  const options: any = {
    method: 'post',
    contentType: 'application/x-www-form-urlencoded',
    headers: {
      Authorization: 'Bearer ' + lineNotifyAccessToken,
    },
    payload: data,
  };

  UrlFetchApp.fetch(url, options);
};
