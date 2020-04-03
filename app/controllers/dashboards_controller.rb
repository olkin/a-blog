class DashboardsController < ApplicationController
  before_action :require_login

  def show
    @posts = current_user.posts
  end
end