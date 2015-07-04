var expect = require('expect.js'),
    sinon = require('sinon'),
    promptlySync = require('../promptly-sync.js'),
    promptly = promptlySync.promptly;

promptlySync.noColor = true;

describe('PromptlySync', function() {
    var promptStub,
        confirmStub,
        passwordStub,
        chooseStub;

    beforeEach(function() {
        promptStub = sinon.stub(promptly, 'prompt');    
        confirmStub = sinon.stub(promptly, 'confirm');    
        passwordStub = sinon.stub(promptly, 'password');    
        chooseStub = sinon.stub(promptly, 'choose');
    });

    afterEach(function() {
        promptStub.restore();
        confirmStub.restore();
        passwordStub.restore();
        chooseStub.restore();
    });

    it('Should generate a prompt', function(done) {
        var questions = [];

        promptStub.yields(null, 'Test');

        questions.push({
            name: 'testPrompt',
            description: 'Make a prompt',
            default: 'test',
        }, {
            name: 'testPrompt2',
            description: 'Make a second prompt',
            type: 'prompt'
        });

        promptlySync(questions, function(err, res) {
            expect(res).to.eql({
                testPrompt: 'Test',
                testPrompt2: 'Test'
            });

            done(err);
        });

        expect(promptStub.calledTwice).to.be(true);
        expect(promptStub.firstCall.calledWith('Make a prompt (test)')).to.be(true);
        expect(promptStub.secondCall.calledWith('Make a second prompt')).to.be(true);
    });

    it('Should generate a confirm', function(done) {
        var questions = [];

        confirmStub.onCall(0).yields(null, true);
        confirmStub.onCall(1).yields(null, false);

        questions.push({
            name: 'testPrompt',
            description: 'Make a confirm',
            type: 'confirm'
        }, {
            name: 'testPrompt2',
            description: 'Make a second confirm',
            type: 'confirm'
        });

        promptlySync(questions, function(err, res) {
            expect(res).to.eql({
                testPrompt: true,
                testPrompt2: false
            });

            done(err);
        });

        expect(confirmStub.calledTwice).to.be(true);
        expect(confirmStub.calledWith('Make a confirm')).to.be(true);
        expect(confirmStub.calledWith('Make a second confirm')).to.be(true);
    });

    it('Should generate a password', function(done) {
        var questions = [];

        passwordStub.onCall(0).yields(null, true);
        passwordStub.onCall(1).yields(null, false);

        questions.push({
            name: 'testPrompt',
            description: 'Make a password',
            type: 'password'
        }, {
            name: 'testPrompt2',
            description: 'Make a second password',
            type: 'password'
        });

        promptlySync(questions, function(err, res) {
            expect(res).to.eql({
                testPrompt: true,
                testPrompt2: false
            });

            done(err);
        });

        expect(passwordStub.calledTwice).to.be(true);
        expect(passwordStub.calledWith('Make a password')).to.be(true);
        expect(passwordStub.calledWith('Make a second password')).to.be(true);
    });

    it('Should generate a choose', function(done) {
        var questions = [];

        chooseStub.onCall(0).yields(null, 'aa');
        chooseStub.onCall(1).yields(null, 'bb');

        questions.push({
            name: 'testPrompt',
            description: 'Make a choose',
            type: 'choose',
            values: ['aa', 'bb']
        }, {
            name: 'testPrompt2',
            description: 'Make a second choose',
            type: 'choose',
            values: ['aa', 'bb']
        });

        promptlySync(questions, function(err, res) {
            expect(res).to.eql({
                testPrompt: 'aa',
                testPrompt2: 'bb'
            });

            done(err);
        });

        expect(chooseStub.calledTwice).to.be(true);
        expect(chooseStub.calledWith('Make a choose', ['aa', 'bb'])).to.be(true);
        expect(chooseStub.calledWith('Make a second choose', ['aa', 'bb'])).to.be(true);
    });
});