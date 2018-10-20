import { app } from '../../index';

interface Item {
    title: String,
    description?: String,
    visible?: Boolean,
    collapsed?: Boolean,
    label?: String,
    children: Array<String>
}

it('should get an item and check its validity', () => {
    let item: Item = { 
        title: 'test',
        description: 'test',
        children: ['test']
    }
    
    app.get = jest.fn().mockImplementation(
        (): Item => item
    );
    
    expect(app.get('/item/:id')).toEqual(item);
});