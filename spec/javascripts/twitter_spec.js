//= require twitter
describe("query_twitter_reoccur", function() {
  beforeEach(function() {
    jasmine.clock().install();
  });

  afterEach(function() {
    jasmine.clock().uninstall();
  });

  it("queries twitter every 60 seconds", function() {
    spyOn(window, 'query_twitter');
    query_twitter_reoccur();

    expect(query_twitter.calls.count()).toEqual(1);

    jasmine.clock().tick(60000);
    expect(query_twitter.calls.count()).toEqual(2);

    jasmine.clock().tick(60000);
    expect(query_twitter.calls.count()).toEqual(3);
  });
});


describe('highlight_html', function() {
  var sample_html_blob;

  beforeEach(function(){
    sample_html_blob = `<p>The quick brown fox jumps over the lazy dog</p>`;
  })

  it("returns the original blob if nothing to highlight", function() {
    expect(highlight_html(sample_html_blob), '').toBe(sample_html_blob);
    expect(highlight_html(sample_html_blob), null).toBe(sample_html_blob);
    expect(highlight_html(sample_html_blob), undefined).toBe(sample_html_blob);
  });

  it("highlight the right word", function() {
    expect(highlight_html(sample_html_blob, 'lazy')).toContain("<span class='highlighted'>lazy</span>");
  });


  it("doesnt highlight the characters in the tags", function() {
    expect(highlight_html(sample_html_blob, 'p')).not.toContain("<<span class='highlighted'>p</span>>");
  });
});


// TODO: Doesn't work yet, Something wrong with the rails asset pipeline, most likely versioning issue
describe('render', function() {
  it("should render html into div#response", function() {
    // // error: setFixtures not defined.
    // setFixtures(`<div id="response"></div>`);

    // render('<p>Hello World</p>');
    // expect($('div#response')).toHaveText("Hello World");
  });
});



describe('handle_success', function() {
  var sample_tweet = {
          user: {
            name: '',
            screen_name: '',
            profile_image_url: '',
          },
          text: '',
          retweet_count: 0
        };

  it("should set global tweets to max 10 results", function() {
    spyOn(window, 'get_tweets').and.callThrough();
    var data = {
      tweets: Array.apply(null, Array(20)).map(function(){
        return sample_tweet;
      })
    }

    handle_success(data);
    expect(get_tweets().length).toEqual(10);
  });

  it("should handle correctly if there are less than 10 tweets", function() {
    spyOn(window, 'get_tweets').and.callThrough();
    var data = {
      tweets: Array.apply(null, Array(3)).map(function(){
        return sample_tweet;
      })
    }

    handle_success(data);
    expect(get_tweets().length).toEqual(3);
  });

});


describe('filter_tweets', function() {
  var tweets;
  beforeEach(function() {
    spyOn(window, 'get_tweets_shown').and.callThrough();
    var sample_tweet = {
            user: {
              name: '',
              screen_name: '',
              profile_image_url: '',
            },
            text: '',
            retweet_count: 0
          };

    tweets = Array.apply(null, Array(3)).map(function(){
      return sample_tweet;
    })
    tweets.push({ user: { name: '', screen_name: '', profile_image_url: '', }, text: 'find me here', retweet_count: 0 });
  });

  it("should set global tweets_shown to right number of results", function() {
    filter_tweets(tweets, 'find me');
    expect(get_tweets_shown().length).toEqual(1);
  });

  it("should set tweets_shown to all tweets if there is no query", function() {
    filter_tweets(tweets, '');
    expect(get_tweets_shown()).toEqual(tweets);
  });
});



// TODO: Doesn't work yet
describe('build_html_widget', function() {
  var tweet;
  beforeEach(function() {
    // // try1, https://derickbailey.com/2014/04/23/mock-objects-in-nodejs-tests-with-jasmine-spies/
    // tweet = {
    //   user: {
    //     name: '',
    //     screen_name: '',
    //     profile_image_url: '',
    //   },
    //   text: '',
    //   retweet_count: 0
    // };
    // spyOn(window, 'build_html_widget').and.callThrough();
    // spyOn(tweet.user, 'name');
    // spyOn(tweet.user, 'screen_name');
    // spyOn(tweet.user, 'profile_image_url');
    // spyOn(tweet, 'text').and.callThrough();
    // spyOn(tweet, 'retweet_count');

    // // try2, http://stackoverflow.com/questions/17120921/jasmine-spy-on-nested-object
    // spyOn(window, 'build_html_widget').and.callThrough();
    // tweet = {
    //   user: {
    //     name: jasmine.createSpy().and.returnValue(''),
    //     screen_name: jasmine.createSpy().and.returnValue(''),
    //     profile_image_url: jasmine.createSpy().and.returnValue(''),
    //   },
    //   text: jasmine.createSpy().and.returnValue(''),
    //   retweet_count: jasmine.createSpy().and.returnValue('')
    // };
    // build_html_widget(tweet)
  });

  it("should call tweet.user.name", function() {
    // expect(tweet.user.name).toHaveBeenCalled();
  });

  it("should call tweet.user.screen_name", function() {
    // expect(tweet.user.screen_name).toHaveBeenCalled();
  });

  it("should call tweet.user.profile_image_url", function() {
    // expect(tweet.user.profile_image_url).toHaveBeenCalled();
  });

  it("should call tweet.text", function() {
    // expect(tweet.text).toHaveBeenCalled();
  });

  it("should call tweet.retweet_count", function() {
    // expect(tweet.retweet_count).toHaveBeenCalled();
  });
});

