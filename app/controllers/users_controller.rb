class UsersController < ApplicationController
  def create
    @user = User.new(params)
    @user.username = params['username']
    if @user.save
      @message = "You are now signed up!"
      render 'application/success'
    else
      @error = "Could not create user"
      render 'application/error', :status => '401'
    end
  end

  def fetch
    @user = current_user
  end
end
