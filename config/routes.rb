Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'hello#index'

  get '/intake', to: 'intake#new'
  post '/intake', to: 'intake#create'
  get '/builder', to: 'builder#index'
  get '/questions',  to: 'questions#index'
  put '/questionnaire/:id', to: 'questionnaire#update'
  get '/questionnaire/:id', to: 'questionnaire#show'

  namespace :admin do
    get '/dashboard', to: 'dashboard#index'
    post '/dashboard', to: 'dashboard#upload'
  end
end
