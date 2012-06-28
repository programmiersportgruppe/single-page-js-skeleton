class Todo
  extend ActiveModel::Naming #used for json serialization

  attr_accessor :content, :id
  @@all = []

  def initialize params
    @id = @@all.size
    @content = params[:content] if params.is_a? Hash
    @content = params if params.is_a? String
  end

  @@all = [Todo.new("get the milk"), Todo.new("pick up the kids"), Todo.new("drink bubble tea")] if !defined? @all

  def save
    @@all << self
  end

  def self.all
    @@all
  end

  def self.find id
    all.find{|t| t.id == id or t.id.to_s == id}
  end
end
