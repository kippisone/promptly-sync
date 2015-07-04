Promptly sync
=============

Promptly sync is a simple commandline prompting tool using `promptly`.

Installation
------------

`npm install promptly-sync`

Usage
-----

```js
var questions = [{
    //Set a property name
    name: 'name',
    //Set prompt type. Could be 'prompt', 'confirm', 'password' or 'choose'. Defaults to 'prompt'
    type: 'prompt',
    //Defines values for a 'choose' prompt
    values: ['aa', 'bb', 'cc'],
    // The default value. If not supplied, the input is mandatory 
    'default': null,
    // Automatically trim the input 
    'trim': true,
    // A validator or an array of validators. 
    'validator': null,
    // Automatically retry if a validator fails 
    'retry': true,
    // Do not print what the user types 
    'silent': false,
    // Input and output streams to read and write to 
    'input': process.stdin,
    'output': process.stdout
}];

var promptlySync = require('promptly-sync');
promptlySync(questions, function(err, result) {
    console.log(result);
});
```

See [Promptly documentation](https://www.npmjs.com/package/promptly) for more infos about promptly.

