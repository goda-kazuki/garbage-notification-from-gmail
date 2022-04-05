import {SheetService} from './sheet.service';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let global: any;

global.searchContactMail = (): void => {
  // const query = '"label:ゴミカレンダー"';
  const query = '"info@matsuyama.gomi.today"';

  const start = 0;
  const max = 1;

  const threads = GmailApp.search(query, start, max);
  const messagesForThreads = GmailApp.getMessagesForThreads(threads);

  if (messagesForThreads.length == 0) {
    return;
  }

  const message = messagesForThreads[0][0];

  const messageBody = message.getPlainBody();

  const matchMessageBody = messageBody.match(/明日、[\s\S]*となります/)[0];

  //メールの削除
  message.moveToTrash();

  if (matchMessageBody.match(/Uncollect/) || matchMessageBody.match(/未回収日/)) {
    return;
  }

  const lineNotifyAccessToken = PropertiesService.getScriptProperties().getProperty(
    'LINE_NOTIFY_ACCESS_TOKEN'
  );

  const url = 'https://notify-api.line.me/api/notify';
  const data = {
    message: matchMessageBody,
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
