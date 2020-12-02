const createOrg = function () {

}

const createSite = function () {

}

module.exports = createElement;




// const createTweetElement = function(post) {
//   // Not a good way of doing it, should break down into chunks

//   const $tweet = $(`
// <article class="tweet">
// <header>
// <span><img src=${post.user.avatars}><p>${post.user.name}</p></span>
// <span class="hide">${post.user.handle}</span>
// </header>
// <p class='tweet-contents'>${escapeStr(post.content.text)}</p>
// <footer>
// <span>${moment(post.created_at).fromNow()}</span>
// <span class="icons">
//   <i class="fas fa-flag hoverBtn" title="Flag Inappropriate"></i>
//   <i class="fas fa-retweet hoverBtn" title="Re-Twit"></i>
//   <i class="fas fa-heart hoverBtn" title="Heart it Up"></i>
// </span>
// </footer>
// </article>
// `);

//   $('#tweets-container').prepend($tweet);
// };


// const renderTweets = function(inputData) {
//   // empty then in section
//   $('#tweets-container').empty();
//   // Reverses JSON to give newest first (should be switchable)
//   const revData = inputData; //.reverse()
//   for (post of revData) {
//     createTweetElement(post);
//   }
// };

// const loadTweets = function(action) {
//   //GET the latest Tweet
//   $.ajax("/tweets/")
//     .then(res => {
//       action(res);
//     });
// };
