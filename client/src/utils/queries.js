import { gql } from '@apollo/client';

// me query for login 
export const GET_ME = gql`
    query getMe {
        me {
            _id
            username
            saveBook {
                bookId
                authors
                description
                title 
                image
            }
        }
    } 
`;