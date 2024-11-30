const aws = require('aws-sdk')
const Handler = require('./handler')

const reko = new aws.Rekognition()
const translate = new aws.Translate()

const handler = new Handler({
    rekoSvc: reko,
    translatorSvc: translate
})

// o bind serve para assegurar que o contexto this é a instancia do handler
module.exports = handler.main.bind(handler)