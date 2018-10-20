import { app } from '../../index';

interface Item {
    title: String,
    description?: String,
    visible?: Boolean,
    collapsed?: Boolean,
    label?: String,
    children: Array<String>
}

let item: Item = { 
    title: 'test',
    description: 'test',
    children: ['test']
}

app.get = jest.fn().mockImplementation(
    (): Item => item
);

it('get an item and check its fields', () => {
    expect(app.get('/item/:id')).toEqual(item);
});