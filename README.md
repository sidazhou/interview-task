
Task
====

Build a simple Twitter feed reader that shows the last 10 tweets from @salesforce user timeline. Each minute this list of tweets should automatically update to show only the 10 most recent tweets. There should also be an input field where the user can type to filter the current list of tweets by whether the input string is present anywhere in the content of a tweet.

Demo
====

- http://sd-temp.herokuapp.com
- http://sd-temp.herokuapp.com/specs


Front End files
--------------

- /app/views/twitter/index.html.erb
- /app/assets/stylesheets/twitter.scss
- /app/assets/javascripts/twitter.js
- /spec/javascripts/twitter_spec.js


Back End files
--------------

- /app/controllers/twitter_controller.rb
