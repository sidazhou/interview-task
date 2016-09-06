class TwitterController < ApplicationController
  def index
  end

  def show
    # @response = JSON.parse(RestClient.get(mailgun_message_url))

    respond_to do |format|
      format.json do
        render json: { test: 123 }
      end
    end
  end
end
