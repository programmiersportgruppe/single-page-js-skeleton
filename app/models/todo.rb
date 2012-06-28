class Todo < ActiveRecord::Base
  attr_accessible :content

  belongs_to :user

  validates_presence_of :user_id
end
