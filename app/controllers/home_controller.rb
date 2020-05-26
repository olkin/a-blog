class HomeController < ApplicationController
  def index
    #@posts = Post.system.order(created_at: :desc)
    render json: { message: 'all good' }, status: :ok
  end
end