const fs = require('fs')

const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/index.html', fileContent, err => {
            //if error then reject promise and send error to promise's .catch() method
            if (err) {
                reject(err)
                //return out of the function here to make sure the promise doesnt accidentally execute the resolve() function as well
                return
            }

            //if went well, resolve the Promise and send the successful data to the .then() method
            resolve({
                ok: true,
                message: 'fIlE CrEAtEd'
            })
        })
    })
}

//because no parameter use ()
const copyFile = () => {
    return new Promise((resolve, reject) => {
        fs.copyFile('./src/style.css', './dist/style.css', err => {
            if (err) {
                reject(err)
                return
            }
            console.log('Style sheet copied successfully!');
            resolve({
                ok: true,
                message: 'fiLe CoPIeD'
            })
        });
    })
}

//*exporting an object with these two promise functions
// module.exports = {
//     writeFile: writeFile,
//     copyFile: copyFile
// }
//*use shorthand property names instead

module.exports = { writeFile, copyFile }