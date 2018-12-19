/*
    Required packages
*/
const yaml = require('write-yaml');
const slugify = require('slugify');
const { prompt } = require('enquirer');
const { sprintf } = require('sprintf-js');


/*
    File path pattern
*/
const pattern = './changelog/unreleased/%s-%s.yml';


/*
    Questions
*/
prompt( [
    {
        type: 'text',
        name: 'message',
        hint: '... e.g. Bug ticket title',
        message: 'Changelog entry message',
        validate() { return this.value.trim() ? true : 'Must not be empty' }
    },
    {
        type: 'autocomplete',
        name: 'type',
        message: 'Type of change',
        initial: 2,
        hint: '... use arrow-keys, <return> to submit',
        choices: ['FIX', 'MISC', 'FEATURE', 'BC BREAK', 'IMPROVEMENT'],
        suggest(input, choices) {
            return choices.filter( choice => choice.message.includes(typed) );
        }
    },
    {
        type: 'text',
        name: 'issue',
        message: 'Jira ticket',
        hint: '... e.g. HD-987',
        validate() { return this.value.trim() ? true : 'Must not be empty' }
    },
    {
        type: 'text',
        name: 'merge-request',
        hint: '... e.g. 790',
        initial: 0,
        message: 'Merge Request',
        result() { return parseInt( this.value, 10 ) },
        validate() { return ! isNaN( this.value ) }
    },
    {
        type: 'confirm',
        name: 'confirmed',
        message: 'Ready to create?',
        initial: true
    },

] ).then( answers => {

    // Exit on abort
    if ( ! answers.confirmed ) return;

    // Fix MR default value
    answers['merge-request'] = parseInt(answers['merge-request'], 10);

    // Remove confirm
    delete answers.confirmed;

    const filepath = sprintf(
        pattern,
        slugify(answers.issue),
        slugify(answers.message.toLowerCase())
    );

    // Write YAML
    yaml(filepath, answers, error => {
        if ( error ) throw new Error( error );
    });

} ).catch( console.error );
