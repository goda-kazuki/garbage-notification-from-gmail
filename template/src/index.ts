import { SheetService } from './sheet.service';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let global: any;

global.searchContactMail = (): void => {
  const lineNotifyAccessToken = PropertiesService.getScriptProperties().getProperty(
    'LINE_NOTIFY_ACCESS_TOKEN'
  );

  Logger.log('lineNotifyAccessToken:' + lineNotifyAccessToken);

  const query = '"清水地区"';
  const start = 0;
  const max = 10;

  const threads = GmailApp.search(query, start, max);
  const messagesForThreads = GmailApp.getMessagesForThreads(threads);

  for (const messages of messagesForThreads) {
    console.log(messages[0].getSubject());
  }
};
