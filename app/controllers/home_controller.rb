# frozen_string_literal: true

class HomeController < ApplicationController
  before_action :fetch_user

  def index; end

  def update_avatar
    @user.update(user_params)
    redirect_to root_path
  end

  def destroy_avatar
    @user.avatar.purge
    redirect_to root_path
  end

  private

  # We mock out our current user here by setting it as our first user
  def fetch_user
    @user ||= User.first
  end

  def user_params
    begin
      params.require(:user).permit(:avatar)
    rescue ActionController::ParameterMissing
      {}
    end
  end
end
