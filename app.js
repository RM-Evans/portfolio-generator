//console.log('Hello Node!');  :)

// let message = 'Hello Node!'

// let sum = 5 + 3

// console.log(message)
// console.log(sum)

//console.log(profileDataArgs)

//console.log('================')

// const printProfileData = profileDataArr => {
//     for (let i = 0; i < profileDataArr.length; i++){

//         console.log(profileDataArr[i])
//     }
//     console.log('================')

//     //is the same as

//     // profileDataArr.forEach((profileItem) => {
//     //     console.log(profileItem)
//     // })

//     //as well as

//     profileDataArr.forEach(profileItem => console.log(profileItem))
// }


// printProfileData(profileDataArgs)

// const name = profileDataArgs[0]
// const github = profileDataArgs[1]


//==============

const inquirer = require('inquirer');

const promptUser = () => {

    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?'
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your github username'
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some info about yourself:'
        }
    ])
}


const promptProject = portfolioData => {
    //if no array property, create one
    if (!portfolioData.projects){
        portfolioData.projects = []
    } 
    console.log(`
        =================
        AdD a nEw pROjEct
        =================
        `);
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project?'
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)'
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (Check all that apply)',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the GitHub link to your project. (Required)'
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        }
    ]).then(projectData => {
        portfolioData.projects.push(projectData)
        if(projectData.confirmAddProject) {
            return promptProject(portfolioData)
        } else {
            return portfolioData
        }
    })
}

promptUser()
//.then(answers => console.log(answers))
.then(promptProject)
.then(projectAnswers => console.log(projectAnswers))
.then(portfolioData => {
    console.log(portfolioData)
})


// const fs = require('fs');
// const generatePage = require('./src/page-template');

// //const profileDataArgs = process.argv.slice(2);


// //const [name, github] = profileDataArgs;


// const pageHTML = generatePage(name, github);

// fs.writeFile('./index.html', pageHTML, err => {
//   if (err) throw err;

//   console.log('Portfolio complete! Check out index.html to see the output!');
// });
