class TwitterController < ApplicationController
  def index
  end

  def show
    @response = JSON.parse(RestClient.get(mailgun_message_url))
  end
end
