// This is the tweet model having the seketon of the tweets which have the attributes like user , text, type, like , bookmark etc.
import mongoose from 'mongoose'

const tweetSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		text: {
			type: String,
			require: true,
		},

		type: {
			type: String,
			default: 'tweet',
		},

		refTweetId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Tweet',
		},
		image: {
			type: String,
		},
		likes: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
		],
		bookmark: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
		],
		retweets: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
		],
	},
	{
		timestamps: true,
	}
)

const Tweet = mongoose.model('Tweet', tweetSchema)

export default Tweet
