var promptly = require('promptly');

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
                default: item.default || null,
                trim: true,
                validator: item.validator || null,
                retry: item.retry || true,
                silent: item.silent || false
            };

            var args = [item.description];
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