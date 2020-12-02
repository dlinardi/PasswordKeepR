/*
  org_id: 18,
  site_id: 77,
  url: "http://www.picard.com",
  login_name: "frenner@white.biz",
  account_email: "frenner@white.biz",
  tags: "nothing to see, work",
  created_date: "2020-10-09T00:00:00.000Z",
  deleted_date: null,
  is_active: true
  }
  ]
  } */

const createSiteElement = (siteObj) => {
  const {
    org_id,
    site_id,
    url,
    login_name,
    account_email,
    tags,
    created_date,
    deleted_date,
    is_active
  } = siteObj;

  // creating structure of tweet container
  const tweet = $('<article class="tweet">');
  const tweetHeader = $('<header>');
  const tweetData = $('<div class="tweet-data">');
  const tweetFooter = $('<footer>');

  const avatar = $(`<img src="${userObject.avatars}">`);
  const nameAvatar = $('<span class="tweeter-name">');
  const name = $('<span>').text(userObject.name);
  nameAvatar.append(avatar);
  nameAvatar.append(name);

  const handle = $('<span class="tweeter-handle">').text(userObject.handle);

  tweetHeader.append(nameAvatar);
  tweetHeader.append(handle);

  const content = $('<p>').text(contentObject.text);

  tweetData.append(content);

  const momentCreated = moment(tweetObj.created_at).fromNow();

  const created = $('<span>').text(momentCreated);
  const reactIcons = $('<span class="social-icons">');

  const flag = $('<i class="fas fa-flag">');
  const repost = $('<i class="fas fa-retweet">');
  const heart = $('<i class="fas fa-heart">');

  // append all social icons to reactIcons span container
  reactIcons.append(flag);
  reactIcons.append(repost);
  reactIcons.append(heart);

  // append all footer content to footer
  tweetFooter.append(created);
  tweetFooter.append(reactIcons);

  // append all tweet content to tweet container
  tweet.append(tweetHeader);
  tweet.append(tweetData);
  tweet.append(tweetFooter);

  return tweet;
};
