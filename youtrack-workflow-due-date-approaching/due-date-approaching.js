const entities = require('@jetbrains/youtrack-scripting-api/entities');
const dateTime = require('@jetbrains/youtrack-scripting-api/date-time');

const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const THIRTY_DAYS_MS = 30 * ONE_DAY_MS;

exports.rule = entities.Issue.onSchedule({
  title: 'Notify assignee about approaching due date',
  search: '#Unresolved has: {Due Date}',
  cron: '0 0 10 ? * MON-FRI',

  guard: (ctx) => {
    const dueDate = ctx.issue.fields.DueDate;
    if (!dueDate) {
      return false;
    }

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const todayMs = startOfToday.getTime();
    const thirtyDaysFromTodayMs = todayMs + THIRTY_DAYS_MS;

    return dueDate >= todayMs && dueDate <= thirtyDaysFromTodayMs;
  },

  action: (ctx) => {
    const issue = ctx.issue;
    const dueDate = issue.fields.DueDate;

    let userToNotify = issue.fields.Assignee;
    if (!userToNotify) {
      userToNotify = issue.project.leader;
    }

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const todayMs = startOfToday.getTime();

    const daysUntilDue = Math.floor((dueDate - todayMs) / ONE_DAY_MS);
    const formattedDate = dateTime.format(dueDate);

    let dueText;
    if (daysUntilDue === 0) {
      dueText = 'today';
    } else if (daysUntilDue === 1) {
      dueText = 'in 1 day';
    } else {
      dueText = 'in ' + daysUntilDue + ' days';
    }

    const notificationText =
      'Issue is due ' + dueText + ' on <i>' + formattedDate + '</i>: ' +
      '<a href="' + issue.url + '">' + issue.summary + '</a>' +
      '<p style="color: gray; font-size: 12px; margin-top: 1em; border-top: 1px solid #D4D5D6">' +
      'Sincerely yours, YouTrack' +
      '</p>';

    userToNotify.notify('[YouTrack, Due date is approaching]', notificationText);
  },

  requirements: {
    DueDate: {
      type: entities.Field.dateType,
      name: 'Due Date'
    },
    Assignee: {
      type: entities.User.fieldType
    }
  }
});
