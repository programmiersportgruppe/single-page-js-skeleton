module ApplicationHelper
  def request_info
    {:user => current_user, :hostname => `hostname`.chomp, :timestamp => Time.now.to_s}.to_json
  end
end
