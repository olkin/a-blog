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

  def edit
    # TODO: check if this user can edit
    @post = Post.find(params[:id])
  end

  def update
    # TODO: check if this user can update
    @post = Post.find(params[:id])

    if @post.update(post_params)
      flash[:success] = 'Post was successfully updated'
      redirect_to root_path
    else
      flash[:error] = 'Post cannot be saved'
      render :edit
    end
  end

  def destroy
    # TODO: check if this user can destroy
    @post = Post.find(params[:id])

    if @post.destroy!
      flash[:success] = 'Post was successfully removed'
    else
      flash[:error] = 'Post could not be removed'
    end

    redirect_to root_path
  end

  private

  def post_params
    params.require(:post).permit(:title, :body, :kind)
  end
end