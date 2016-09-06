class TwitterController < ApplicationController
  def index
  end

  def show #should be in api
    # doesnt work
    # @response = JSON.parse(RestClient.get("https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=sidazhou&count=1"))

    respond_to do |format|
      format.json do
        render json: { test: params[:query] }
      end
    end
  end
end
