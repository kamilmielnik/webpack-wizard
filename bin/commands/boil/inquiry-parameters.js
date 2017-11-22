const inquirer = require('inquirer');

const inquiryBoilerplate = {
  type: 'list',
  name: 'boilerplate',
  message: 'Select boilerplate',
  choices: [
    'react-redux'
  ]
};

const inquiryName = {
  type: 'input',
  name: 'name',
  message: 'Project name',
  default: 'my-project'
};

const inquiryTitle = {
  type: 'input',
  name: 'title',
  message: 'Project title',
  default: 'My Project'
};

const inquiryVersion = {
  type: 'input',
  name: 'version',
  message: 'Version',
  default: '0.0.1'
};

const inquiryLicense = {
  type: 'input',
  name: 'license',
  message: 'License',
  default: 'MIT'
};

const inquiryAuthor = {
  type: 'input',
  name: 'authorName',
  message: 'Author'
};

const inquiryAuthorEmail = {
  type: 'input',
  name: 'authorEmail',
  message: 'Author\'s email'
};

const questions = [
  inquiryBoilerplate,
  inquiryName,
  inquiryTitle,
  inquiryVersion,
  inquiryLicense,
  inquiryAuthor,
  inquiryAuthorEmail
];

module.exports = () => inquirer.prompt(questions);
