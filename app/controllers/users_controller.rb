class UsersController < ApplicationController
  def create
    @user = User.new
    @user.username = params['username']
    @user.password = params['password']
    @user.password_confirmation = params['password_confirmation']

    if @user.save
      if login_but_keep_csrf_token(params)
        @message = "You are now signed up!"
        render 'application/success'
      else
        @error = "Could not log in after creating the user."
        render 'application/error', :status => '401'
      end
    else
      @error = "Could not create user."
      render 'application/error', :status => '401'
    end
  end

  def fetch
    @user = current_user
  end
end
