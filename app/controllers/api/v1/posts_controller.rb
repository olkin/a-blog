class Api::V1::PostsController < ApplicationController
  include CurrentUserConcern

  before_action :set_post, only: [:destroy, :update, :show]

  def index
    posts = Post.order(created_at: :desc)
    render json: posts
  end

  def show
    render json: @post
  end

  def create
    post = Post.new(post_params.merge(user: current_user))

    if post.save
      render json: post, status: :created
    else
      render json: { error: post.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    # TODO: check if this user can update
    @post.update(post_params)

    render json: @post
  end
  #
  def destroy
    # TODO: check if this user can destroy
    @post.destroy!

    render json: { }
  end

  private

  def post_params
    params.require(:post).permit(:title, :body, :kind)
  end

  def set_post
    @post = Post.find(params[:id])
  end
end