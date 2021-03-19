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

//const fs = require('fs');

const { writeFile, copyFile } = require('./utils/generate-site')
//GREAT! now we can use generate-site in our promises at the bottom of the

const generatePage = require('./src/page-template');

const promptUser = () => {

    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name? (Required)',
            validate: nameInput => {
                //TODO make this into a variable so its not so busy 
                if (nameInput) {
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
                if (gitUsernameInput) {
                    return true
                } else {
                    console.log('Enter your github username!')
                    return false
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some info about yourself for an "About" section?',
            default: true
        },
        {
            //only show this if above confirm about is true
            type: 'input',
            name: 'about',
            message: 'provide some info about yourself:',
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
    console.log(`
    =================
    AdD a nEw pROjEct
    =================
    `);
    //if no array property, create one
    if (!portfolioData.projects) {
        portfolioData.projects = []
    }
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project? (Required)',
            validate: projectNameInput => {
                if (projectNameInput) {
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
                if (projectDescriptionInput) {
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
                if (projectLinkInput) {
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
        if (projectData.confirmAddProject) {
            return promptProject(portfolioData)
        } else {
            return portfolioData
        }
    })
}

// //*MOCK DATA TESTS A LOT FASTER - COPY STRUCTURE OF INPUT DATA AND PROVIDE ANSWERS THEN USE AS INPUT DATA
// const mockData = {
//     name: 'Lernantino',
//     github: 'lernantino',
//     confirmAbout: true,
//     about:
//         'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et.',
//     projects: [
//         {
//             name: 'Run Buddy',
//             description:
//                 'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
//             languages: ['HTML', 'CSS'],
//             link: 'https://github.com/lernantino/run-buddy',
//             feature: true,
//             confirmAddProject: true
//         },
//         {
//             name: 'Taskinator',
//             description:
//                 'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
//             languages: ['JavaScript', 'HTML', 'CSS'],
//             link: 'https://github.com/lernantino/taskinator',
//             feature: true,
//             confirmAddProject: true
//         },
//         {
//             name: 'Taskmaster Pro',
//             description:
//                 'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
//             languages: ['JavaScript', 'jQuery', 'CSS', 'HTML', 'Bootstrap'],
//             link: 'https://github.com/lernantino/taskmaster-pro',
//             feature: false,
//             confirmAddProject: true
//         },
//         {
//             name: 'Robot Gladiators',
//             description:
//                 'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque.',
//             languages: ['JavaScript'],
//             link: 'https://github.com/lernantino/robot-gladiators',
//             feature: false,
//             confirmAddProject: false
//         }
//     ]
// };
// const pageHTML = generatePage(mockData);
// //*MOCK TEST END FUNC

promptUser()
// //.then(answers => console.log(answers))
//take in the answers to the prompts and push into array
    .then(promptProject)
// //.then(projectAnswers => console.log(projectAnswers))
//finished portfolio data object will be sent to the generate page function which will return the finished HTML template code into pageHTML
    .then(portfolioData => {
        return generatePage(portfolioData)
    })
    //pass pageHTML into the write file function which returns a promise, using return so the promise is returned into the next .then() method
    .then(pageHTML => {
        return writeFile(pageHTML)
    })
    //yay we created it! now take the writeFileResponse object provided by the the writeFile() functions resolve() execution to log it and then return copyFile()
    .then(writeFileResponse => {
        console.log(writeFileResponse)
    })
    //lets us know if the css was copied correctly, and if so, we are done!!!
    .then(copyFileResponse => {
        console.log(copyFileResponse)
    })
    //catching error here makes it so we dont have to use it in each of the above
    .catch(err => {
        console.log(err)
    })

//     const pageHTML = generatePage(portfolioData);

//callback style sheet so we know html file is created FIRST
// fs.writeFile('./dist/index.html', pageHTML, err => {
//     if (err) throw err;

//     console.log('Page created! Check out index.html in this directory to see it!');

//     fs.copyFile('./src/style.css', './dist/style.css', err => {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         console.log('Style sheet copied successfully!');
//     });
//     //         //     console.log('Portfolio complete! Check out index.html to see the output!');
// });

    // })




 // *****const profileDataArgs = process.argv.slice(2);


// //const [name, github] = profileDataArgs;



