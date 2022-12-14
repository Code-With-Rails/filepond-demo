# frozen_string_literal: true

Rails.application.routes.draw do
  post 'home', to: 'home#update_avatar', as: :update_avatar
  delete 'home', to: 'home#destroy_avatar', as: :destroy_avatar

  # FilePond endpoints
  post 'filepond/fetch', to: 'filepond#fetch'
  delete 'filepond/remove', to: 'filepond#remove'

  root to: 'home#index'
end
