const {danger, warn} = require('danger')
const load = require('@commitlint/load');
const lint = require('@commitlint/lint');

const CONFIG = {
  extends: ['@commitlint/config-conventional']
};

// No PR is too small to include a description of why you made a change
if (danger.github.pr.body.length < 10) {
  warn('Please include a description of your PR changes.');
}

var errorCount = 0;
// validate commit message in PR if it conforms conventional change log, notify if it doesn't.
var messageConventionValid = danger.git.commits.reduce(function (acc, value) {
  load(CONFIG)
    .then(opts => lint(value.message, opts.rules, opts.parserPreset ? { parserOpts: opts.parserPreset.parserOpts } : {}))
    .then(report => {
      return report.valid && acc;
    });
  ;
}, true);

if (!messageConventionValid) {
  warn('commit message does not follows conventional change log (' + ++errorCount + ')');
  markdown('> (' + errorCount + ') : Project uses conventional change log to generate changelog automatically. It seems some of commit messages are not following those, please update commit messages.');
}
