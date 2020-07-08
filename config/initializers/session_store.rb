if Rails.env == 'production'
  Rails.application.config.session_store :cookie_store,
                                         key: '_nets_and_balls_app',
                                         domain: 'netsandballs.ca'
else
  Rails.application.config.session_store :cookie_store,
                                         key: '_a_blog_app'
end