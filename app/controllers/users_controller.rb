class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
  end

  def follow
    require_login

    @user = User.find(params[:id])
    current_user.follow(@user)

    redirect_back(fallback_location: @user)
  end
end