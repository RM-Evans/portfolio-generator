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
            }
        ])
}
    promptUser().then(answers => console.log(answers));


// const fs = require('fs');
// const generatePage = require('./src/page-template');

// //const profileDataArgs = process.argv.slice(2);


// //const [name, github] = profileDataArgs;


// const pageHTML = generatePage(name, github);

// fs.writeFile('./index.html', pageHTML, err => {
//   if (err) throw err;

//   console.log('Portfolio complete! Check out index.html to see the output!');
// });
