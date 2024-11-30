const {
    describe,
    test,
    expect
} = require('@jest/globals')

const aws =  require('aws-sdk')
aws.config.update({
    region: 'us-east-1'
})

const { main } = require('../../src')

const requestMock = require('./../mocks/request.json')

describe('Image analyser test suite', () => {
    test('it should analyse successfully the image returning the results', async () => {
        const expected = {
            statusCode: 200,
            body: 'A imagem tem\n'.concat([
                '93.88% de ser do tipo Bebê',
                '93.88% de ser do tipo pessoa',
                '91.70% de ser do tipo rosto',
                '91.70% de ser do tipo cabeça',
                '84.53% de ser do tipo desenho animado',
            ].join('\n'))
        }

        const result = await main(requestMock)

        expect(result).toStrictEqual(expected)
    })

    test('given an empty queryString it should return http status code 400', async () => {
        const expected = {
            statusCode: 400,
            body: 'an IMG is required!'
        }

        const result = await main({queryStringParameters: {}})

        expect(result).toStrictEqual(expected)
    })
    
    test('given an invalid imageURL it should return http status code 500', async () => {
        const expected = {
            statusCode: 500,
            body: 'Internal Server Error!'
        }

        const result = await main({queryStringParameters: { imageUrl: 'test'}})

        expect(result).toStrictEqual(expected)
    })
})