class PostsController < ApplicationController
  before_action :require_login

  def create
    Post.create!(post_params.merge(user: current_user))

    redirect_back(fallback_location: root_path)
  end

  private

  def post_params
    params.require(:post).permit(:title, :body)
  end
end