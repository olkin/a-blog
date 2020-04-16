class DashboardsController < ApplicationController
  before_action :require_login

  def show
    @posts = current_user.posts.order(created_at: :desc)
  end
end