class User < ActiveRecord::Base
  authenticates_with_sorcery!

  has_many :todos

  attr_accessible :password, :password_confirmation

  validates_confirmation_of :password
  validates_presence_of :password, :on => :create
  validates_presence_of :username
  validates_uniqueness_of :username
end
