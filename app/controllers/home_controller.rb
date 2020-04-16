class HomeController < ApplicationController
  def index
    @posts = Post.system.order(created_at: :desc)
  end
end