class RegistrationsController < ApplicationController
  def create
    user = User.create! email: params[:user][:email],
                        password: params[:user][:password],
                        password_confirmation: params[:user][:password]

    if user
      session[:user_id] = user.id
      render json: { user: user, status: :created }, status: :created
    else
      render json: {}, status: :unprocessable_entity
    end
  end
end