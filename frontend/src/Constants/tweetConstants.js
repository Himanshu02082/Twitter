// In here we are defining constants for action types that can be dispatched by the Redux actions.
// Each constant represents a different action that can be performed on a tweet, such as creating a tweet, liking a tweet, or deleting a tweet.
// The action types are categorized into different sections based on their purpose, such as tweet creation, tweet retrieval,
// tweet interaction (like, retweet), tweet bookmarks, and tweet deletion.
export const TWEET_CREATE_REQUEST = 'TWEET_CREATE_REQUEST'
export const TWEET_CREATE_SUCCESS = 'TWEET_CREATE_SUCCESS'
export const TWEET_CREATE_FAIL = 'TWEET_CREATE_FAIL'
export const TWEET_CREATE_RESET = 'TWEET_CREATE_RESET'

export const USER_TWEETS_REQUEST = 'USER_TWEETS_REQUEST'
export const USER_TWEETS_SUCCESS = 'USER_TWEETS_SUCCESS'
export const USER_TWEETS_FAIL = 'USER_TWEETS_FAIL'

export const FOLLOWING_TWEETS_REQUEST = 'FOLLOWING_TWEETS_REQUEST'
export const FOLLOWING_TWEETS_SUCCESS = 'FOLLOWING_TWEETS_SUCCESS'
export const FOLLOWING_TWEETS_FAIL = 'FOLLOWING_TWEETS_FAIL'

export const TWEET_LIKE_REQUEST = 'TWEET_LIKE_REQUEST'
export const TWEET_LIKE_SUCCESS = 'TWEET_LIKE_SUCCESS'
export const TWEET_LIKE_FAIL = 'TWEET_LIKE_FAIL'

export const TWEET_UNLIKE_REQUEST = 'TWEET_UNLIKE_REQUEST'
export const TWEET_UNLIKE_SUCCESS = 'TWEET_UNLIKE_SUCCESS'
export const TWEET_UNLIKE_FAIL = 'TWEET_UNLIKE_FAIL'

export const TWEET_RETWEET_REQUEST = 'TWEET_RETWEET_REQUEST'
export const TWEET_RETWEET_SUCCESS = 'TWEET_RETWEET_SUCCESS'
export const TWEET_RETWEET_FAIL = 'TWEET_RETWEET_FAIL'

export const TWEET_UNRETWEET_REQUEST = 'TWEET_UNRETWEET_REQUEST'
export const TWEET_UNRETWEET_SUCCESS = 'TWEET_UNRETWEET_SUCCESS'
export const TWEET_UNRETWEET_FAIL = 'TWEET_UNRETWEET_FAIL'

export const LIKED_TWEETS_REQUEST = 'LIKED_TWEETS_REQUEST'
export const LIKED_TWEETS_SUCCESS = 'LIKED_TWEETS_SUCCESS'
export const LIKED_TWEETS_FAIL = 'LIKED_TWEETS_FAIL'

export const RETWEETED_TWEETS_REQUEST = 'RETWEETED_TWEETS_REQUEST'
export const RETWEETED_TWEETS_SUCCESS = 'RETWEETED_TWEETS_SUCCESS'
export const RETWEETED_TWEETS_FAIL = 'RETWEETED_TWEETS_FAIL'

export const GET_TWEET_BY_ID_REQUEST = 'GET_TWEET_BY_ID_REQUEST'
export const GET_TWEET_BY_ID_SUCCESS = 'GET_TWEET_BY_ID_SUCCESS'
export const GET_TWEET_BY_ID_FAIL = 'GET_TWEET_BY_ID_FAIL'

export const GET_REPLIED_REQUEST = 'GET_REPLIED_REQUEST'
export const GET_REPLIED_SUCCESS = 'GET_REPLIED_SUCCESS'
export const GET_REPLIED_FAIL = 'GET_REPLIED_FAIL'

export const TWEET_BOOKMARK_REQUEST = 'TWEET_BOOKMARK_REQUEST'
export const TWEET_BOOKMARK_SUCCESS = 'TWEET_BOOKMARK_SUCCESS'
export const TWEET_BOOKMARK_FAIL = 'TWEET_BOOKMARK_FAIL'

export const TWEET_UNBOOKMARK_REQUEST = 'TWEET_UNBOOKMARK_REQUEST'
export const TWEET_UNBOOKMARK_SUCCESS = 'TWEET_UNBOOKMARK_SUCCESS'
export const TWEET_UNBOOKMARK_FAIL = 'TWEET_UNBOOKMARK_FAIL'

export const GET_BOOKMARKED_REQUEST = 'GET_BOOKMARKED_REQUEST'
export const GET_BOOKMARKED_SUCCESS = 'GET_BOOKMARKED_SUCCESS'
export const GET_BOOKMARKED_FAIL = 'GET_BOOKMARKED_FAIL'

export const TWEET_DELETE_REQUEST = 'TWEET_DELETE_REQUEST'
export const TWEET_DELETE_SUCCESS = 'TWEET_DELETE_SUCCESS'
export const TWEET_DELETE_FAIL = 'TWEET_DELETE_FAIL'
