const {danger, warn} = require('danger')
const lint = require('@commitlint/lint')

// No PR is too small to include a description of why you made a change
if (danger.github.pr.body.length < 10) {
  warn('Please include a description of your PR changes.');
}

// validate commit message in PR if it conforms conventional change log, notify if it doesn't.
var messageConventionValid = danger.git.commits.reduce(function (acc, value) {
  var valid = lint(value.message);
  return valid && acc;
}, true);

if (!messageConventionValid) {
  warn('commit message does not follows conventional change log (' + ++errorCount + ')');
  markdown('> (' + errorCount + ') : RxJS uses conventional change log to generate changelog automatically. It seems some of commit messages are not following those, please check [contributing guideline](https://github.com/ReactiveX/rxjs/blob/master/CONTRIBUTING.md#commit-message-format) and update commit messages.');
}
