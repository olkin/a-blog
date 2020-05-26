class HomeController < ApplicationController
  def show
    #@posts = Post.system.order(created_at: :desc)
    render json: { message: 'all good' }, status: :ok
  end

  def index
  end
end