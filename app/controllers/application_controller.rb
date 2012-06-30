class ApplicationController < ActionController::Base
  protect_from_forgery

  before_filter :set_locale

  def set_locale
    I18n.locale = params[:locale] || I18n.default_locale
  end

  def make_sure_user_is_logged_in
    if not current_user
      @error = "Log in before you can access this page."
      render 'application/error', :status => 401
    end
  end

  def not_authenticated
    redirect_to login_url, :alert => "First login to access this page."
  end
end
