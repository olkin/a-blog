if Rails.env == 'production'
  Rails.application.config.session_store :cookie_store,
                                         key: '_a_blog_app',
                                         domain: 'vb-blog.herokuapp.com'
else
  Rails.application.config.session_store :cookie_store,
                                         key: '_a_blog_app'
end