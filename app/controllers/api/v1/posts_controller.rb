class Api::V1::PostsController < ApplicationController
  def index
    posts = Post.all
    render json: posts
  end

  def show
    render json: Post.find(params[:id])
  end
  #
  # def create
  #   @post = current_user.posts.build(post_params)
  #
  #   if @post.save
  #     redirect_to root_path
  #   else
  #     flash[:error] = 'Oopsie'
  #     render :edit
  #   end
  # end
  #
  # def edit
  #   # TODO: check if this user can edit
  #   post = Post.find(params[:id])
  # end
  #
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