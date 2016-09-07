class TwitterController < ApplicationController
  def index
  end

  def show
    client = Twitter::REST::Client.new do |config|
      config.consumer_key        = "NFlQOaQspcPdOBHbXOI2KuAIN"
      config.consumer_secret     = "5D6mzFQGK3oxN3rDzHZwHsST2kofGcKRoCGZ7ZRnUgHZXP2V1s"
      config.access_token        = "52503702-d5thcrCicxhqDNQ2mM6vhBkvxJFspab4f9E2vn16S"
      config.access_token_secret = "dWK9vOFYvs0xW75sgpg1tRLRHoZOxe5jXSiit2Y7QJFVI"
    end

    respond_to do |format|
      format.json do
        begin
          tweets = client.user_timeline(params[:query])
          render json: { tweets: tweets }
        rescue
          render json: { tweets: '' }, status: 500
        end
      end
    end
  end
end



# .attrs[:user][:name]
# .attrs[:user][:screen_name]
# .attrs[:user][:profile_image_url]
# .attrs[:text]
# .attrs[:text]
# .attrs[:retweet_count]
