class PostsController < ApplicationController
  before_action :require_login

  def create
    @post = current_user.posts.build(post_params)

    if @post.save
      redirect_to root_path
    else
      flash[:error] = 'Oopsie'

      render :edit
    end
  end

  private

  def post_params
    params.require(:post).permit(:title, :body)
  end
end