class TodosController < ApplicationController
  before_filter :make_sure_user_is_logged_in

  # GET /todos.json
  def index
    @todos = current_user.todos

    respond_to do |format|
      format.json { render json: @todos }
    end
  end

  # GET /todos/1.json
  def show
    @todo = Todo.find(params[:id])

    respond_to do |format|
      format.json { render json: @todo }
    end
  end

  # GET /todos/new.json
  def new
    @todo = Todo.new

    respond_to do |format|
      format.json { render json: @todo }
    end
  end

  # GET /todos/1/edit
  def edit
    @todo = Todo.find(params[:id])
  end

  # POST /todos.json
  def create
    @todo = Todo.new(params[:todo])
    @todo.user_id = current_user.id

    respond_to do |format|
      if @todo.save
        format.json { render json: @todo, status: :created, location: @todo }
      else
        format.json { render json: @todo.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /todos/1.json
  def update
    @todo = Todo.find(params[:id])

    respond_to do |format|
      if @todo.update_attributes(params[:todo])
        format.json { head :no_content }
      else
        format.json { render json: @todo.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /todos/1.json
  def destroy
    @todo = Todo.find(params[:id])
    @todo.destroy

    respond_to do |format|
      format.json { head :no_content }
    end
  end
end
