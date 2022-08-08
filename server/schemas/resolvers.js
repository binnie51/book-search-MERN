const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async () => {
            return User.find().populate('')
        }
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);

            return { token, user };
        },

        login: async (parent, {email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);
            
            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        },

        saveBook: async (parent, args, context) => {
            if (context.user) {
                const addBook = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    {
                        $addToSet: {
                            bookId: args.bookId,
                            description: args.description,
                            title: args.title,
                            image: args.image,
                            authors: args.authors,
                        },
                    },
                    {new: true},   
                );
                
                return addBook;
            }
        },

        removeBook: async (parent, {bookID}, context) => {
            const removeThisBook = await User.findByIdAndUpdate(
                { _id: thoughtId },
                { $pull: { saveBook: { bookID } } },
                { new: true }
            );
            return removeThisBook;
        }
    }
}

module.exports = resolvers;