class ApplicationController < ActionController::Base
  protect_from_forgery

  before_filter :set_locale

  def set_locale
    I18n.locale = params[:locale] || I18n.default_locale
  end

  def not_authenticated
    redirect_to login_url, :alert => "First login to access this page."
  end
end
