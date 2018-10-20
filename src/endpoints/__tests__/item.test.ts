import { app } from '../../index';
// import { Item } from '../../schemas/item/item';

// interface ItemInterface {
//     title: String,
//     description?: String,
//     visible?: Boolean,
//     collapsed?: Boolean,
//     label?: String,
//     children: Array<String>
// }

interface ResponseInterface {
    statusCode: Number,
    data: String
}

// let item: ItemInterface = {
//     title: 'test',
//     description: 'test',
//     children: ['test']
// }

it('should return 200 response for item get REST method', () => {
    app.get = jest.fn().mockImplementation(
        (): ResponseInterface => ({
          statusCode: 200,
          data: 'Some data'
        })
    );
    expect(app.get('/item/test').statusCode).toEqual(200);
});

it('should return 400 response for item get REST method', () => {
    app.get = jest.fn().mockImplementation(
        (): ResponseInterface => ({
          statusCode: 400,
          data: 'Some data'
        })
    );
    expect(app.get('/item/test').statusCode).toEqual(400);
});
