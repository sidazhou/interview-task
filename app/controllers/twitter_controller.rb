class TwitterController < ApplicationController
  def index
  end

  def show
    # https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=sidazhou&count=1
    # doesnt work
    @response = JSON.parse(RestClient.get("https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=sidazhou&count=1"))

    respond_to do |format|
      format.json do
        render json: { test: 123 }
      end
    end
  end
end
