class SessionsController < ApplicationController
  def create
    user = login(params[:username], params[:password], params[:remember_me])
    if user
      #redirect_back_or_to root_url, :notice => "You are now logged in."
      #redirect_to root_url, :notice => "You are now logged in."
      @message = "You are now logged in!"
      render 'application/success'
    else
      @error = "Username or password was invalid."
      render 'application/error', :status => '401'
    end
  end

  def destroy
    logout
    @message = "You are now logged out. Thanks."
    render 'application/success'
  end
end
