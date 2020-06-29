class SessionsController < ApplicationController
  include CurrentUserConcern

  def create
    user = User
               .find_by(email: params[:user][:email])
               .try(:authenticate, params[:user][:password])

    if user
      session[:user_id] = user.id
      Rails.logger.info 'Saving session!!!!'
      Rails.logger.info session[:user_id]
      render json: {
          logged_in: true,
          user: user
      }, status: :created
    else
      render json: { }, status: :unauthorized
    end
  end

  def logged_in
    if @current_user
      render json: {
          logged_in: true,
          user: @current_user
      }
    else
      render json: { logged_in: false }
    end
  end

  def logout
    reset_session
    render json: { logged_out: true }, status: :ok
  end
end