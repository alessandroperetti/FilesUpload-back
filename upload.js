const IncomingForm = require('formidable').IncomingForm
const fs = require('fs')

const mapping = {
  'application/pdf': './uploads/pdf/',
  'image/png': './uploads/png/',
  'text/plain': './uploads/txt/'
}

module.exports = function upload(req, res) {
  var form = new IncomingForm()

  form.on('file', (field, file) => {

    console.log(file);

    if (!fs.existsSync(mapping[file.type])){
      fs.mkdirSync(mapping[file.type])
    }

    fs.copyFile(file.path, mapping[file.type] + file.name, (err) => {
      if (err) throw err;
      console.log('The file has been copied');
    });


  })
  form.on('end', () => {
    res.json()
  })
  form.parse(req)
}