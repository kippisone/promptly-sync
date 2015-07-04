var promptly = require('promptly'),
    chalk = require('chalk');

module.exports = function(questions, done) {
    var ask = function() {
        var i = 0;
        var result = {};

        var next = function() {
            var item = questions[i++];
            if (!item) {
                return done(null, result);
            }

            var promptOpts = {
                default: item.default,
                trim: item.trim,
                validator: item.validator,
                retry: item.retry,
                silent: item.silent
            };

            var description = item.description;

            if (item.default) {
                description = description + ' ' + (
                    module.exports.noColor ?
                    '(' + item.default + ')' :
                    chalk.grey('(' + item.default + ')'
                ));
            }

            var args = [description];
            if (item.type === 'choose') {
                args.push(item.values);
            }

            args.push(promptOpts, function(err, res) {
                if (!err) {
                    result[item.name] = res;
                }

                next();
            });

            promptly[item.type || 'prompt'].apply(promptly, args);
        };

        next();
    };

    ask();
};

module.exports.promptly = promptly;
module.exports.prompt = promptly.prompt;
module.exports.password = promptly.password;
module.exports.confirm = promptly.confirm;
module.exports.choose = promptly.choose;
module.exports.noColor = false;