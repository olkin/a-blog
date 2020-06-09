class Api::V1::PostsController < ApplicationController
  def index
    posts = Post.all
    render json: posts
  end

  def show
    render json: Post.find(params[:id])
  end

  def create
    current_user = User.last # TODO: read user
    post = current_user.posts.build(post_params)

    if post.save
      render json: post, status: :created
    else
      render json: { error: post.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    # TODO: check if this user can update
    post = Post.find(params[:id])
    post.update(post_params)

    render json: post
  end
  #
  def destroy
    # TODO: check if this user can destroy
    post = Post.find(params[:id])

    post.destroy!

    render json: { }
  end

  private

  def post_params
    params.require(:post).permit(:title, :body, :kind)
  end
end