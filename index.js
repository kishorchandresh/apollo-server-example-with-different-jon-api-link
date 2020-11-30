const { ApolloServer, gql } = require('apollo-server');
const fetch = require('node-fetch');

// fetch datas from diffrent sorces
const getCity = fetch('https://api.mocki.io/v1/b043df5a').then(res => res.json());
const toDoList = fetch('https://api.mocki.io/v1/13f44462').then(res => res.json());
const allPost = fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json());


// A schema is a collection of type definitions (hence "typeDefs")
const typeDefs = gql`
    # this is for Get all post from https://jsonplaceholder.typicode.com/posts
    type AllPosts{
        userId: Int
        id: Int
        title: String
        body: String
    }

    # this is for get City from https://api.mocki.io/v1/b043df5a
    type ToDoList{
        title: String
        description: String
    }

    # this is for toDo List from https://api.mocki.io/v1/13f44462
    type GetCitys{
        name: String,
        city: String,
    }


    # The "Query" type is special: it lists all of the available queries that clients can execute, along with the return type for each.
    type Query {
        getCity:[GetCitys],
        toDoList:[ToDoList],
        allPost:[AllPosts]
    }
`;

// Resolvers define the technique for fetching the types defined in the schema.
const resolvers = {
    Query: {
        getCity:()  =>  getCity,
        toDoList:() =>  toDoList,
        allPost:()  =>  allPost
    },
};
 
// The ApolloServer constructor requires two parameters: your schema definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });


// The `listen` method launches a web server with port 9000. 
/*
    // defult port is 4000
    server.listen().then(({ url }) => {
        console.log(`  Server ready at ${url}`);
    });
*/
server.listen(9000).then(({ url }) => {
  console.log(`  Server ready at ${url}`);
});