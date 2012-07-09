class UsersController < ApplicationController
  def create
    @user = User.new
    @user.username = params['username']
    @user.password = params['password']
    @user.password_confirmation = params['password_confirmation']

    if @user.save and login(params[:username], params[:password], params[:remember_me])
      @csrf_token = form_authenticity_token
      @message = "You are now logged in!"
      render 'application/success'
    else
      @error = "Could not create user."
      render 'application/error', :status => '401'
    end
  end

  def fetch
    @user = current_user
  end
end
