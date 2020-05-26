Rails.application.routes.draw do
  resources :sessions, only: [:create]
  root to: 'home#index'



    # resources :posts, only: [:create, :edit, :destroy, :update]
end
