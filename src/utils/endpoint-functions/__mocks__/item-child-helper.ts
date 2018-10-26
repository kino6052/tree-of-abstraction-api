export const getItemChild = jest.fn().mockImplementation(
  async () => {
      throw new Error('Couldn\'t get item child');
  }
)

export const saveItemChild = jest.fn().mockImplementation(
  async () => {
      return new Promise((resolve) => {
        resolve({})
      })
  }
)
