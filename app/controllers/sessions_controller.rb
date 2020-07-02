class SessionsController < ApplicationController
  include CurrentUserConcern

  before_action :set_user, only: :create

  def create
    if @user && @user.authenticate(params[:user][:password])
      session[:user_id] = @user.id
      render json: { logged_in: true, user: @user }, status: :created
    else
      render json: { }, status: :unauthorized
    end
  end

  def logged_in
    if current_user
      render json: { logged_in: true, user: current_user }, status: :ok
    else
      render json: { logged_in: false }, status: :ok
    end
  end

  def logout
    reset_session
    render json: { logged_out: true }, status: :ok
  end

  private

  def set_user
    @user = User.find_by(email: params[:user][:email])
  end
end