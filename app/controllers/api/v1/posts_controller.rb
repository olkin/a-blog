class Api::V1::PostsController < ApplicationController
  def index
    @posts = Post.system.reorder(created_at: :desc)
    render json: @posts
  end

  def create
    @post = Post.create!(post_params)
    if @post
      render json: @post
    else
      render json: @post.errors
    end
  end

  def show
    if post
      render json: post
    else
      render json: post.errors
    end
  end

  def destroy
    post.destroy
    render json: { message: 'Post deleted!' }
  end

  private

  def post_params
    params.require(:post).permit(:title, :body, :kind)
  end

  def post
    @post ||= Post.find(params[:id])
  end
end