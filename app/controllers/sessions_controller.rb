class SessionsController < ApplicationController
  def create
    if login(params[:username], params[:password], params[:remember_me])
      @csrf_token = form_authenticity_token
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
    @csrf_token = form_authenticity_token
    render 'application/success'
  end
end
