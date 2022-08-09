import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation loginUser($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token 
            user {
                _id
                username
            }
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook($bookId: String!, $title: String, $authors: [String], $description: String!, $image: String, $link: String) {
        saveBook(bookId: $bookId, title: $title, authors: $authors, description: $description, image: $image, link: $link) {
            addBook {
                _id
                title
                authors
                description
                link
            }
        }
    }
`;

export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: String!) {
        removeThisBook(bookId: $bookId) {
            _id
        }
    }
`;