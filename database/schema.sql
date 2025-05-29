-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (for your application users)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Twitter accounts connected by users
CREATE TABLE IF NOT EXISTS twitter_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    twitter_user_id VARCHAR(50) NOT NULL,
    username VARCHAR(50) NOT NULL,
    display_name VARCHAR(100),
    access_token VARCHAR(255) NOT NULL,
    access_token_secret VARCHAR(255) NOT NULL,
    profile_image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, twitter_user_id)
);

-- Scheduled tweets
CREATE TABLE IF NOT EXISTS scheduled_tweets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    account_id UUID REFERENCES twitter_accounts(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    scheduled_time TIMESTAMP WITH TIME ZONE NOT NULL,
    status VARCHAR(20) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'posted', 'failed', 'cancelled')),
    posted_tweet_id VARCHAR(50),
    error_message TEXT,
    media_urls TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tweet history
CREATE TABLE IF NOT EXISTS tweet_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    account_id UUID REFERENCES twitter_accounts(id) ON DELETE CASCADE,
    tweet_id VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    posted_at TIMESTAMP WITH TIME ZONE NOT NULL,
    like_count INTEGER DEFAULT 0,
    retweet_count INTEGER DEFAULT 0,
    reply_count INTEGER DEFAULT 0,
    quote_count INTEGER DEFAULT 0,
    impression_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(account_id, tweet_id)
);

-- Engagement metrics
CREATE TABLE IF NOT EXISTS engagement_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    account_id UUID REFERENCES twitter_accounts(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    follower_count INTEGER DEFAULT 0,
    following_count INTEGER DEFAULT 0,
    tweet_count INTEGER DEFAULT 0,
    mention_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(account_id, date)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_scheduled_tweets_account_status ON scheduled_tweets(account_id, status);
CREATE INDEX IF NOT EXISTS idx_scheduled_tweets_time ON scheduled_tweets(scheduled_time);
CREATE INDEX IF NOT EXISTS idx_tweet_history_account_posted ON tweet_history(account_id, posted_at);
CREATE INDEX IF NOT EXISTS idx_engagement_metrics_account_date ON engagement_metrics(account_id, date);

-- Create a function to update the updated_at column
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update the updated_at column
CREATE TRIGGER update_users_modtime
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_twitter_accounts_modtime
BEFORE UPDATE ON twitter_accounts
FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_scheduled_tweets_modtime
BEFORE UPDATE ON scheduled_tweets
FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_tweet_history_modtime
BEFORE UPDATE ON tweet_history
FOR EACH ROW EXECUTE FUNCTION update_modified_column();
