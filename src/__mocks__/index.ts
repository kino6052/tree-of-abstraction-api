export let app = {
  get: jest.fn().mockImplementation(
    (URL) => {
      switch (URL) {
        case '/item':
          return new Promise<Object>(
            (resolve) => {
              resolve(
                {
                    statusCode: 200,
                    data: [
                      {
                        _id: 1,
                        title: 'Parent',
                        children: [2, 3]
                      },
                      {
                        _id: 2,
                        title: 'Child001',
                        children: [1]
                      },
                      {
                        _id: 3,
                        title: 'Child002',
                        children: [1]
                      }
                    ],
                }
              )
            }
          )
        default:
          return new Promise<Object>(
            (resolve) => {
              resolve([]);
            }
          )
      }
    }
  )
}
