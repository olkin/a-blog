module CurrentUserConcern
  extend ActiveSupport::Concern

  included do
    before_action :force_load_session, :set_current_user
    attr_reader :current_user
  end

  def set_current_user
    Rails.logger.info '#set_current_user'
    if session[:user_id]
      @current_user = User.find(session[:user_id])
      Rails.logger.info "Current user: #{@current_user.id}"
    else
      Rails.logger.info 'unknown user'
    end
  end

  private

  def force_load_session
    # session is lazy loaded and for some reason doesn't load on read
    session[:init] = 'BS' unless session.loaded?
  end
end