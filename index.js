//Packages need for the app
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const api = require('./utils/api');

const generateMarkdown = require('./utils/generateMarkdown');

//Questions to get the user input
const questions = [
    {
        type: 'input',
        message: "Enter your GitHub username?",
        name: 'username',
        default: '',
        validate: (answer) => {
            if(answer.length < 1){
                return console.log("A valid GitHub repo is required for a badge.");
            }
            return true;
        }
    },
    {
    
        type: 'input',
        message: "What is the name of your GitHub repo?",
        name: 'repo',
        default: 'README_Generator',
        validate: (answer) => {
            if (answer.length < 1){
                return console.log("A valid GitHub repo is required for a badge. ");
            }
            return true;
        }
    
    },
    {
        type: 'input',
        message:'Enter your project title.',
        name: 'title',
        default: 'Title Your Project',
        validate: (answer) => {
            if(answer.length < 1) {
                return console.log("You must enter a project title");
            }
            return true;
        }
    
    },
    {
        type: 'input',
        message: "Describe your project.",
        name: 'description',
        default: 'Project Description',
        validate: (answer) => {
            if(answer.length  < 1){
                return console.log("A project description is required");
            }
            return true;
        }
    },
    {
        type: 'input',
        message: "Describe the steps to install this project",
        name: 'installation'
    },
    {
        type: 'input',
        message: "Provide instructions and examples of the project in use for the Usage section",
        name: 'usage'
    },
    {
        type: 'input',
        message: "Provide guidelines for developers if they would like to contribute",
        name: 'contributing'
    },
    {
        type: 'input',
        message: 'If you have created tests for the project, provide examples of how to run them',
        name: 'tests'
    },
    {
        type: 'list',
        message: "choose a license for your project",
        choices: ['GNU AGPLv3', 'GNU GPLv3', 'GNU LGPLv3', 'Mozilla Public License 2.0', 'Apache License 2.0', 'MIT License', 'Boost Software License 1.0', 'The Unlicense'],
        name: 'license'
    }
    
    ];
//Function to write the README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
        if(err){
            return console.log(err);
        }
        console.log("Success! Your README.md file has been generated")
    });
}
const writeFileAsync = util.promisify(writeToFile);
//Function to initialize the app
async function init() {
    try {
        const userResponses = await inquirer.prompt(questions);
        console.log("Your responses: ", userResponses);
        console.log("Thank you for your responses, Fetching your GutHub data next");

        const userInfo = await api.getUser(userResponses);
        console.log("Your GitHub user info: ", userInfo);

        console.log("generating your readme next")
        const markdown = generateMarkdown(userResponses, userInfo);
        console.log(markdown);

        await writeFileAsync('README_Generated.md', markdown);

    } catch(error){
        console.log(error);
    }
};
//Calling the app
init();