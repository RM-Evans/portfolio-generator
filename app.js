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
const fs = require('fs');
const generatePage = require('./src/page-template');

const promptUser = () => {

    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name? (Required)',
            validate: nameInput => {
                //TODO make this into a variable so its not so busy 
                if(nameInput) {
                    return true 
                } else {
                    console.log('Enter your name!')
                    return false
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your github username (Required)',
            validate: gitUsernameInput => {
                //TODO make this into a variable so its not so busy 
                if(gitUsernameInput) {
                    return true 
                } else {
                    console.log('Enter your github username!')
                    return false
                }
            }
        },
        {
            type:'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some info about yourself for an "About" section?',
            default: true
        },
        {
            //only show this if above confirm about is true
            type: 'input',
            name: 'about',
            message:'provide some info about yourself:',
            when: ({ confirmAbout }) => confirmAbout
            // when: ({ confirmAbout }) => {
            //     if (confirmAbout) {
                    
            //         return true
            //     } else {
                    
            //         return false
            //     }
            // }
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
            message: 'What is the name of your project? (Required)',
            validate: projectNameInput => {
                if(projectNameInput) {
                    return true 
                } else {
                    console.log('Enter the name of your project!')
                    return false
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)',
            validate: projectDescriptionInput => {
                if(projectDescriptionInput) {
                    return true 
                } else {
                    console.log('Enter a description of your project!')
                    return false
                }
            }
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
            message: 'Enter the GitHub link to your project. (Required)',
            validate: projectLinkInput => {
                if(projectLinkInput) {
                    return true 
                } else {
                    console.log('Enter a link to your project!')
                    return false
                }
            }
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
//.then(projectAnswers => console.log(projectAnswers))
.then(portfolioData => {
    console.log(portfolioData)
})




 // *****const profileDataArgs = process.argv.slice(2);


// //const [name, github] = profileDataArgs;


// const pageHTML = generatePage(name, github);

// fs.writeFile('./index.html', pageHTML, err => {
//   if (err) throw err;

//   console.log('Portfolio complete! Check out index.html to see the output!');
// });
