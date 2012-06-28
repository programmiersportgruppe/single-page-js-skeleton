class SessionsController < ApplicationController
  def create
    user = login(params[:username], params[:password], params[:remember_me])
    if user
      #redirect_back_or_to root_url, :notice => "You are now logged in."
      redirect_to root_url, :notice => "You are now logged in."
    else
      flash.now.alert = "Username or password was invalid."
      render :new
    end
  end

  def destroy
    logout
    redirect_to root_url, :notice => "You are now logged out. Thanks."
  end
end
