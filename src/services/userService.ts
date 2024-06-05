export const getUsers = async (count: Number): Promise<any> => fetch(
    `https://jsonplaceholder.typicode.com/users?_limit=${count}`, {
    method: 'GET',
    }
);