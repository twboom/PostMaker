// General info
class Author {

    constructor(name, handle, image, verified) {

        this.name = name; // Name of author
        this.handle = handle; // Handle of author
        this.image = image; // Profile picture of author
        this.verified = verified; // Is author verified?

    };

};


class Content {

    constructor(text, image) {

        this.text = text; // Text of the content
        this.image = image; // Image of the content

    }

}


// Twitter posts
class Twitter {

    constructor(author, content, date, origin, retweets, quotes, likes, notification) {

        this.author = author; // Author object
        this.content = content // Content object
        this.date = date; // Date and time of the tweet
        this.origin = origin; // Twitter for iPhone/Android/ect.
        this.retweets = retweets; // Amount of retweets
        this.quotes = quotes; // Amount of quotes (retweets with comment)
        this.likes = likes; // Amount of likes
        this.notification = notification; // Author received a reply / Somebody liked
        
    };

};
