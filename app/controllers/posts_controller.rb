class PostsController < ApplicationController
  before_action :require_login

  def create
    redirect_back(fallback_location: root_path)
  end
end